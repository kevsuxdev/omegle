import { ArrowLeft, RefreshCcw } from 'lucide-react'
import React from 'react'

const SkipAlert = ({ findMatch, goBack }) => {
  return (
    <div className='bg-white border border-black p-6 rounded-lg shadow-md w-96 text-center'>
      <h2 className='text-xl font-semibold mb-4 text-black'>
        Chatmate Disconnected
      </h2>
      <p className='mb-4 text-black/90 text-sm font-medium'>
        Your chatmate has left the conversation. <br />
        Find a new match and keep the conversation going!
      </p>
      <div className='flex space-x-2'>
        <button
          onClick={findMatch}
          className='bg-black text-white p-2 rounded-lg text-sm tracking-wide font-semibold w-full cursor-pointer'
        >
          Find New Match
        </button>
        <button
          onClick={goBack}
          className='bg-black text-white p-2 rounded-lg text-sm tracking-wide font-semibold w-full cursor-pointer'
        >
          Back
        </button>
      </div>
    </div>
  )
}

export default SkipAlert
