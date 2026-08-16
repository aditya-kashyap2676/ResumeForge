import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Reuse from './Reuse';

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

        {/* hero section 1*/}
        <section1>
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
        </section1>
            {/* Hero Section 2 */}
        <section className='mt-5'>
          <h1 className="text-2xl font-bold text-center mb-12">Features That Makes You Shine</h1>
          <div className="">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Reuse
                title="Easy Editing"
                description="Update Your resume sections with live preview and instant formatting"
              />
              <Reuse
                title="Beautiful Templates"
                description="Choose from modern, proffesional templates that are easy to customize"
              />
              <Reuse
                title="One-Click Export"
                description="Download Your resume instantly as high-quality PDF with one click"
              />
            </div>
          </div>
        </section>

        {/* footer */}
        <footer className="bg-gray-50 border-t border-gray-200 mt-16">
          <div className="max-w-7xl mx-auto px-6 py-10">

            {/* Main Footer */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Logo / Description */}
              <div>
                <h2 className="text-xl font-bold">
                  Resume<span className="text-blue-500">Forge</span>
                </h2>
                <p className="text-sm text-gray-600 mt-3 max-w-sm">
                  Create professional resumes effortlessly
                  and stand out from the crowd.</p>
              </div>
              {/* Quick Links */}
              <div>
                <h3 className="font-semibold mb-3">Quick Links</h3>
                <div className="flex flex-col gap-2 text-sm text-gray-600">
                  <a href="#" className="hover:text-blue-500 transition">Home</a>
                  <a href="#" className="hover:text-blue-500 transition">Templates</a>
                  <a href="#" className="hover:text-blue-500 transition">Features</a>
                  <a href="#" className="hover:text-blue-500 transition">Login</a>
                </div>
              </div>
              {/* Get Started */}
              <div>
                <h3 className="font-semibold mb-3">Get Started</h3>
                <p className="text-sm text-gray-600 mb-4">
                  Start building your professional resume today.</p>
                <button className="bg-black text-white px-5 py-2 rounded-lg text-sm hover:bg-gray-800 transition">
                  Get Started
                </button>
              </div>
            </div>
            {/* Bottom Footer */}
            <div className="border-t border-gray-200 mt-8 pt-6 flex flex-col md:flex-row justify-between items-center gap-3">
              <p className="text-sm text-gray-500 text-center md:text-left">
                © 2026 ResumeForge. All rights reserved.</p>
              <div className="flex gap-5 text-sm text-gray-500">
                <a href="#" className="hover:text-black transition">Privacy Policy</a>
                <a href="#" className="hover:text-black transition">Terms of Service</a>
              </div>
            </div>

          </div>
        </footer>

      </div>
    </div>
  )
}
export default Landingpage
