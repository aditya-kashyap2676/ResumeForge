import React from 'react'

const Stepprogress = ({progress}) => {
  return (
    <div className="w-full bg-purple-50 h-1 overflow-hidden rounded-xs">
        <div className="h-1 bg-linear-to-r from-purple-500/85 to-purple-700 transition-all rounded"
        style={{width:`${progress}%`}}></div>
    </div>
  )
}

export default Stepprogress
