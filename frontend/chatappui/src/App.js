import React, { useEffect } from 'react'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import axios from 'axios'
import LandingPage from './components/LandingPage'
import CreateAccountPage from './components/CreateAccountPage'
import LoginPage from './components/LoginPage'
import ChatroomPage from './components/ChatroomPage'
import './App.css'

function App() {
  const baseUrl = process.env.REACT_APP_API_BASE_URL

  const fetchData = async () => {
    await axios
      .get(baseUrl)
      .catch(error => {
        console.log(error)
      })
  }

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<LandingPage/>}/>
        <Route path="/createaccount" element={<CreateAccountPage/>}/>
        <Route path="/login" element={<LoginPage/>}/>
        <Route path="/chatroom" element={<ChatroomPage/>}/>
      </Routes>
    </Router>
  );
}

export default App;
