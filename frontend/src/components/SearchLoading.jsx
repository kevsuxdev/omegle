import { Loader2 } from 'lucide-react'
import { motion } from 'framer-motion'
import React from 'react'

const SearchLoading = ({ goBack }) => {
  return (
    <div className='bg-white border border-black p-6 rounded-lg shadow-md flex flex-col items-center justify-center w-86'>
      <h2 className='text-lg font-semibold mb-4'>Searching...</h2>
      <motion.div
        className='flex justify-center items-center mb-4'
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 1 }}
      >
        <Loader2 className='w-10 h-10 text-blue-400 animate-spin' />
      </motion.div>
      <button
        onClick={goBack}
        className='bg-black p-2 rounded-lg font-semibold tracking-wide transition w-full flex items-center justify-center text-sm text-white cursor-pointer'
      >
        Cancel
      </button>
    </div>
  )
}

export default SearchLoading
