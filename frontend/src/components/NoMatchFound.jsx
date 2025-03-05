import React from 'react'

const NoMatchFound = ({ findMatch, goBack }) => {
  return (
    <div className='bg-gray-800 p-6 rounded-lg shadow-md w-96 text-center'>
      <h2 className='text-xl font-semibold mb-4 text-red-400'>
        No Matches Found
      </h2>
      <p className='text-gray-300 mb-4'>Try again with a different hashtag.</p>
      <div className='flex space-x-2'>
        <button
          onClick={findMatch}
          className='bg-blue-500 p-2 rounded-lg hover:bg-blue-600 transition flex-1 flex items-center justify-center'
        >
          <RefreshCcw className='w-5 h-5 mr-2' /> Retry
        </button>
        <button
          onClick={goBack}
          className='bg-gray-700 p-2 rounded-lg hover:bg-gray-600 transition flex-1 flex items-center justify-center'
        >
          <ArrowLeft className='w-5 h-5 mr-2' /> Back
        </button>
      </div>
    </div>
  )
}

export default NoMatchFound
