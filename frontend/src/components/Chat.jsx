import { useState, useEffect, useRef } from 'react'
import io from 'socket.io-client'
import Starting from './Starting'
import SearchLoading from './SearchLoading'
import NoMatchFound from './NoMatchFound'
import Conversation from './Conversation'
import SkipAlert from './SkipAlert'

const socket = io('http://localhost:5000', {
  transports: ['websocket'],
})

const Chat = () => {
  const [hashtag, setHashtag] = useState('')
  const [partner, setPartner] = useState(null)
  const [message, setMessage] = useState('')
  const [chat, setChat] = useState([])
  const [loading, setLoading] = useState(false)
  const [searching, setSearching] = useState(false)
  const [noMatch, setNoMatch] = useState(false)
  const [partnerLeft, setPartnerLeft] = useState(false)
  const chatEndRef = useRef(null)

  useEffect(() => {
    socket.on('match_found', (partnerId) => {
      setPartner(partnerId)
      setChat([])
      setLoading(false)
      setNoMatch(false)
      setPartnerLeft(false)
    })

    socket.on('receive_message', ({ from, message }) => {
      setChat((prev) => [...prev, { sender: from, text: message }])
    })

    socket.on('partner_left', () => {
      setPartner(null)
      setChat([])
      setPartnerLeft(true)
    })

    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' })

    return () => socket.off()
  }, [chat])

  const findMatch = () => {
    if (hashtag.trim()) {
      setLoading(true)
      setSearching(true)
      setNoMatch(false)
      setPartnerLeft(false)

      const normalizedHashtag = hashtag.trim().toLowerCase() // 👈 Normalize input
      socket.emit('find_match', normalizedHashtag)

      // Set timeout for no matches found
      setTimeout(() => {
        if (loading) {
          setLoading(false)
          setNoMatch(true)
        }
      }, 10000)
    }
  }

  const sendMessage = () => {
    if (message.trim() && partner) {
      socket.emit('send_message', { to: partner, message })
      setChat((prev) => [...prev, { sender: 'Me', text: message }])
      setMessage('')
    }
  }

  const skipChat = () => {
    if (partner) {
      socket.emit('leave_chat', partner)
      setPartner(null)
      setChat([])
      findMatch()
    }
  }

  const goBack = () => {
    setPartner(null)
    setLoading(false)
    setSearching(false)
    setNoMatch(false)
    setPartnerLeft(false)
    setHashtag('')
  }

  return (
    <div className='flex flex-col items-center justify-center h-screen bg-[#f6f7fa] text-black'>
      {!searching ? (
        <Starting
          hashtag={hashtag}
          setHashtag={setHashtag}
          findMatch={findMatch}
        />
      ) : loading ? (
        <SearchLoading goBack={goBack} />
      ) : noMatch ? (
        <NoMatchFound findMatch={findMatch} goBack={goBack} />
      ) : partnerLeft ? (
        <SkipAlert findMatch={findMatch} goBack={goBack} />
      ) : (
        <Conversation
          skipChat={skipChat}
          hashtag={hashtag}
          chat={chat}
          chatEndRef={chatEndRef}
          message={message}
          setMessage={setMessage}
          sendMessage={sendMessage}
        />
      )}
    </div>
  )
}

export default Chat
