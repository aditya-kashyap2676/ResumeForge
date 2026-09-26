import React from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { Toaster } from "react-hot-toast"
import Landingpage from './Pages/Landingpage'
import Dashboard from "./Pages/Home/dashboard"
import Editresume from './Pages/Resumeupdate/Editresume'
import UserProvider from './context/useContext'

const App = () => {
  return (
    <UserProvider>
      <Router>
        <Toaster />

        <Routes>
          <Route path='/' element={<Landingpage />} />
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='/resume/:resumeId' element={<Editresume />} />
        </Routes>
      </Router>
    </UserProvider>
  )
}

export default App