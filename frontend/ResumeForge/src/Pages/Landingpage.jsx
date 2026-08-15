import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Landingpage = () => {
  const navigate = useNavigate();
  const [openAuthmodal, setOpenAuthmodal] = useState(false)
  const [currentpage, setCurrentpage] = useState("Login")
  const handle = () => { }
  return (
    <div className='w-full min-h-full bg-white'>
      <div className='px-4 py-6'>
        {/* Header section  */}
        <header className='flex justify-between px-10 items-center mb-16'>
          <div className='text-2xl font-extrabold'>ResumeForge</div>
          <button
            className='bg-purple-100 font-semibold text-black px-7 py-3 rounded-lg hover:bg-gray-800 hover:text-white transition-colors cursor-pointer'
            onClick={() => {
              setOpenAuthmodal(true)
            }}>Login / Signup</button>
        </header>

        {/* hero section */}
        <div className="max-w-7xl mx-auto px-6 md:px-10 py-16">
          <div className="flex flex-col md:flex-row items-center gap-10">

            <div className="w-full md:w-1/2">
              <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
                Build Your{" "}

                <span className="text-blue-500">
                  Resume
                </span>

                <br />

                <span className="text-transparent bg-clip-text bg-[radial-gradient(circle,_#7182ff_0%,_#3cff52_100%)] bg-[length:200%_200%] animate-text-shine">
                  Effortlessly
                </span>
              </h1>

              <p className="text-lg text-gray-700 mb-8 max-w-xl">
                Craft a standout resume in minutes with our smart and intuitive
                resume builder.
              </p>

              <button
                className="bg-black text-sm font-semibold text-white px-8 py-3 rounded-lg hover:bg-gray-800 transition-colors cursor-pointer"
                onClick={handle}
              >
                Get Started
              </button>
            </div>


            <div className="w-full md:w-1/2 flex justify-center">
              <h1>Image is header</h1>
            </div>

          </div>
        </div>
      </div>
    </div>
  )
}

export default Landingpage
