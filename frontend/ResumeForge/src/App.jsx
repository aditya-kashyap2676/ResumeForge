import React from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { Toaster } from "react-hot-toast"
import Landingpage from './Pages/Landingpage'
import Signup from './Pages/Auth/signup'
import Dashboard from './Pages/Home/Dashboard'
import Editresume from './Pages/Resumeupdate/Editresume'

const App = () => {
  return (
    <>
    <div>
      <Router>
        <Toaster />
          
        <Routes>
          <Route path='/' element={<Landingpage />} />
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='/resume/:resumeId' element={<Editresume />} />
        </Routes>
      </Router>
    </div>

    <Toaster
    toastOptions={{
      className:"",
      style:{
        fontSize:"15px"
      },
    }}
    />


    </>
  )
}

export default App