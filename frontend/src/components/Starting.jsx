import React from 'react'
import { Search } from 'lucide-react'

const Starting = ({ hashtag, setHashtag, findMatch }) => {
  return (
    <div className='bg-white border border-black p-6 rounded-lg shadow-md flex flex-col items-center justify-center w-96'>
      <article className='flex flex-col gap-1 mb-5'>
        <h2 className='text-xl font-semibold mb-4 text-center'>
          Connect with Strangers, <br />
          Chat Instantly!
        </h2>
        <p className='text-wrap text-xs text-center leading-5'>
          Meet new people worldwide through real-time hashtag-based matching.
          Chat, share, and make new connections effortlessly!
        </p>
      </article>
      <div className='flex items-center space-y-2 justify-center w-full flex-col'>
        <input
          type='text'
          placeholder='#'
          value={hashtag}
          onChange={(e) => setHashtag(e.target.value)}
          className='px-3 py-2 rounded-lg text-black border-black border text-sm focus:outline-none w-full'
        />
        <button
          onClick={findMatch}
          className='bg-black text-white text-xs font-semibold tracking-wide p-2 rounded-lg w-full cursor-pointer '
        >
          Find People
        </button>
      </div>
    </div>
  )
}

export default Starting
