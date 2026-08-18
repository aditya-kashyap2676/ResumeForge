import React from 'react'

const Reuse = ({title,description}) => {
  return (
    <div className='bg-gray-50 rounded-xl p-6 shadow-sm hover:shadow-md transition'>
      <h1 className='text-lg font-semibold mb-3'>{title}</h1>
      <p className="text-gray-600 text-sm">{description}</p>
    </div>
  )
}

export default Reuse
