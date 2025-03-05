import express from 'express'
import http from 'http'
import { Server } from 'socket.io'
import dotenv from 'dotenv'

dotenv.config()

const app = express()
const server = http.createServer(app)

const io = new Server(server, {
  cors: {
    origin: process.env.CLIENT_URL,
    methods: ['GET', 'POST'],
  },
})

const waitingUsers = {}

io.on('connection', (socket) => {
  console.log(`User connected: ${socket.id}`)

  socket.on('find_match', (hashtag) => {
    if (waitingUsers[hashtag] && waitingUsers[hashtag] !== socket.id) {
      // Found a match
      const partnerId = waitingUsers[hashtag]
      delete waitingUsers[hashtag]

      // Notify both users
      io.to(socket.id).emit('match_found', partnerId)
      io.to(partnerId).emit('match_found', socket.id)
    } else {
      // No match found, add to waiting list
      waitingUsers[hashtag] = socket.id
    }
  })

  socket.on('send_message', ({ to, message }) => {
    io.to(to).emit('receive_message', { from: socket.id, message })
  })

  socket.on('leave_chat', (partnerId) => {
    io.to(partnerId).emit('partner_left')
  })

  socket.on('disconnect', () => {
    console.log(`User disconnected: ${socket.id}`)
    // Remove user from waiting list if they disconnect
    for (let tag in waitingUsers) {
      if (waitingUsers[tag] === socket.id) {
        delete waitingUsers[tag]
      }
    }
  })
})

server.listen(5000, () => console.log('Server running on port 5000'))
