import { Loader2 } from 'lucide-react'
import React from 'react'

const loading = () => {
  return (
    <div className='min-h-screen w-full flex flex-col items-center justify-center'>
        <Loader2 className='animate-spin h-5 w-5 text-[#FF8C00]'/>
    </div>
  )
}

export default loading