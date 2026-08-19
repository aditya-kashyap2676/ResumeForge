import React, { useState } from 'react'
import { useNavigate } from "react-router-dom"
import Input from '../../components/Inputs/Input'
import { validateEmail } from '../../Utils/helper'
import Profilephotoselecter from '../../components/Inputs/Profilephotoselecter'
const Signup = ({ setCurrentpage }) => {
  const [profilepic, setProfilepic] = useState("")
  const [fullname, setFullname] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState(null)
  const navigate = useNavigate()

  //Handle signup Form submit
  const handlesignup = async (e) => {
    e.preventDefault()

    let profileimgUrl = "";
    if (!fullname) {
      setError("Please enter full name.")
      return
    }
    if (!validateEmail(email)) {
      setError("Please enter your email.")
      return
    }
    if (!password) {
      setError("Please enter password.")
      return
    }
    //Signup API call
    try {

    } catch (e) {

    }

  }
  return (
    <div>
      <div className="w-[90vw] md:w-[33vw] p-7 flex flex-col justify-center">
        <h3 className="text-lg font-semibold text-black">Create an Account</h3>
        <p className="text-xs text-slate-700 mt-[5px] mb-6">Join us today by entering your details below.</p>
        <form onSubmit={handlesignup}>
          <Profilephotoselecter image={profilepic} setImage={setProfilepic}></Profilephotoselecter>
          <div className="grid grid-cols-1 md:grid-cols-1 gap-2">
            <Input type="text" value={fullname} label="Full Name"
              onChange={({ target }) => setFullname(target.value)}
              placeholder="Aditya"/>
            <Input type="email" value={email} label="Email Address"
              onChange={({ target }) => setEmail(target.value)}
              placeholder="example@example.com"/>
            <Input type="password" value={password} label="Password"
              onChange={({ target }) => setPassword(target.value)}
              placeholder="At least 8 characters"/>
          </div>
          {error && <p className='text-red-500 text-xs pb-2.5'>{error}</p>}
          <button type='submit' className="w-full bg-black text-white py-3 rounded-lg mt-5 active:scale-95"> SIGN UP</button>
          <p className="text-[13px] text-slate-800 mt-3">Already have an Account {" "}
            <button className='font-medium text-primary underline cursor-pointer' onClick={() => { setCurrentpage("login") }}>Login </button>
          </p>
        </form>
      </div>
    </div>
  )
}

export default Signup
