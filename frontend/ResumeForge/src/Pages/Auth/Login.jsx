import React, { useState } from 'react'
import {useNavigate} from "react-router-dom"
import Input from '../../components/Inputs/Input'
const Login = () => {
  const [email,setEmail] = useState("")
  const [password,setPassword] = useState("")
  const [error,setError] = useState(null)
  const navigate = useNavigate()

  // Handle Login form Submit 
  const handlelogin = async (e)=>{}
  return (
    <div className='w-[90vw] md:w-[33vw] p-7 flex flex-col justify-center'>
      <h3 className="text-lg font-semibold text-black">Welcome Back</h3>
      <p className="text-xs text-slate-700 mt-[5px] mb-6">Please Enter your details to login </p>
      <form onSubmit={handlelogin}>
        <Input type="email" value={email} 
        onChange={({target})=>{setEmail(target.value)}}
        label="Email Address"
        placeholder='Email@example.com'/>
        <Input type="password" value={password} 
        onChange={({target})=>{setPassword(target.value)}}
        label="Password" 
        placeholder='Minimum 8 characters'/>
        {error && <p className='text-red-500 text-xs pb-2.5'>{error}</p>}
        <button type='submit' className="w-full bg-black text-white py-3 rounded-lg mt-5 ">LOGIN</button>
        <p className="text-[13px] text-slate-800 mt-3">Don't hava an account?{" "}
          <button className='font-medium text-primary underlined cursor-pointer'
          onClick={()=>{
            setCurrentpage("signup")
          }}>Signup
          </button>
        </p>
      </form>
    </div>
  )
}

export default Login
