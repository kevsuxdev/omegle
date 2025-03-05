import { SendHorizontal } from 'lucide-react'
import React from 'react'

const Conversation = ({
  skipChat,
  hashtag,
  chat,
  chatEndRef,
  message,
  setMessage,
  sendMessage,
}) => {
  return (
    <div className='w-full max-w-xl bg-white border-black border p-4 rounded-lg shadow-lg flex flex-col h-[500px]'>
      <article className='flex items-center justify-between'>
        <button
          onClick={skipChat}
          className='text-xs font-semibold bg-black text-white tracking-wide p-2 px-5 rounded-md hover:bg-black/90 transition cursor-pointer active:scale-90'
        >
          Skip
        </button>
        <h3 className='text-black font-semibold text-xs self-end bg-black/5 p-2 px-4 rounded-lg'>
          Match with #{hashtag}
        </h3>
      </article>
      <div className='flex-1 overflow-y-auto space-y-2 p-3 bg-white rounded-md mt-2'>
        {chat.map((msg, index) => (
          <div
            key={index}
            className={`p-2 rounded-lg max-w-xs text-sm ${
              msg.sender === 'Me' ? 'ml-auto bg-black/5' : 'mr-auto bg-black/5'
            }`}
          >
            <b>{msg.sender === 'Me' ? 'You' : 'Stranger'}:</b> {msg.text}
          </div>
        ))}
        <div ref={chatEndRef} />
      </div>
      <div className='flex items-center mt-2 space-x-2'>
        <input
          type='text'
          placeholder='Type a message...'
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className='w-full px-3 py-2 rounded-lg bg-white text-black focus:outline-none text-sm border border-black'
        />
        <button
          onClick={sendMessage}
          className='bg-black text-white p-2 rounded-lg hover:bg-black/90 transition cursor-pointer active:scale-90'
        >
          <SendHorizontal className='w-5 h-5' />
        </button>
      </div>
    </div>
  )
}

export default Conversation
