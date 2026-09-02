import React, { useContext, useState } from 'react'
import { useNavigate } from "react-router-dom"
import Input from '../../components/Inputs/Input'
import { validateEmail } from '../../Utils/helper'
import Profilephotoselecter from '../../components/Inputs/Profilephotoselecter'
import axiosInstance from '../../utils/axiosInstance'
import { API_PATHS } from '../../utils/apipaths'
import { UserContext } from '../../context/useContext'
import uploadImage from '../../Utils/uploadimage'

const Signup = ({ setCurrentpage }) => {

  const [profilepic, setProfilepic] = useState("")
  const [fullname, setFullname] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState(null)

  const { updateUser } = useContext(UserContext)
  const navigate = useNavigate()

  // Handle signup Form submit
  const handlesignup = async (e) => {
    e.preventDefault()

    setError(null)

    let profileImageUrl = ""

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

    // Signup API call
    try {

      // Upload Image if Present
      if (profilepic) {
        const imgUploads = await uploadImage(profilepic)
        profileImageUrl = imgUploads.imageUrl || ""
      }

      const response = await axiosInstance.post(
        API_PATHS.AUTH.REGISTER,
        {
          name: fullname,
          email,
          password,
          profileImageUrl
        }
      )

      const { token } = response.data

      if (token) {
        localStorage.setItem("token", token)
        updateUser(response.data)
        navigate('/dashboard')
      }

    } catch (error) {

      if (error.response && error.response.data.message) {
        setError(error.response.data.message)
      } else {
        setError(error.message || "Something went wrong. Please try again.")
      }

    }
  }

  return (
    <div>
      <div className="w-[90vw] md:w-[33vw] p-7 flex flex-col justify-center">

        <h3 className="text-lg font-semibold text-black">
          Create an Account
        </h3>

        <p className="text-xs text-slate-700 mt-[5px] mb-6">
          Join us today by entering your details below.
        </p>

        <form onSubmit={handlesignup}>

          <Profilephotoselecter
            image={profilepic}
            setImage={setProfilepic}
          />

          <div className="grid grid-cols-1 md:grid-cols-1 gap-2">

            <Input
              type="text"
              value={fullname}
              label="Full Name"
              onChange={({ target }) => setFullname(target.value)}
              placeholder="Aditya"
            />

            <Input
              type="email"
              value={email}
              label="Email Address"
              onChange={({ target }) => setEmail(target.value)}
              placeholder="example@example.com"
            />

            <Input
              type="password"
              value={password}
              label="Password"
              onChange={({ target }) => setPassword(target.value)}
              placeholder="At least 8 characters"
            />

          </div>

          {error && (
            <p className='text-red-500 text-xs pb-2.5'>
              {error}
            </p>
          )}

          <button
            type='submit'
            className="w-full bg-black text-white py-3 rounded-lg mt-5 active:scale-95"
          >
            SIGN UP
          </button>

          <p className="text-[13px] text-slate-800 mt-3">
            Already have an Account{" "}
            <button
              type="button"
              className='font-medium text-primary underline cursor-pointer'
              onClick={() => {
                setCurrentpage("login")
              }}
            >
              Login
            </button>
          </p>

        </form>
      </div>
    </div>
  )
}

export default Signup