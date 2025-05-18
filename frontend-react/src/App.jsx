import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min.js'

import './css/bootstrap.min.css'
import './css/Home.css'

import Home from './pages/Home'
import SignIn from './pages/SignIn'
import WorkerSignUp from './pages/WorkerSignUp'
import ClientSignUp from './pages/ClientSignUp'
import WorkerEditProfile from './pages/WorkerEditProfile'
import ClientEditProfile from './pages/ClientEditProfile'
import SkillSearch from './pages/SkillSearch'
import WorkerProfile from './pages/WorkerProfile'
import Leads from './pages/Leads'
import Header from './layout/Header'

import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { useEffect, useState, createContext } from 'react'
import Axios from 'axios';

// const UserContext = createContext()
export const UserContext = createContext(); // Added export here



function App() {
  const [user, setUser] = useState({
    "loggedIn": false
  })


  // Check if user has a session
  Axios.defaults.withCredentials = true;
  useEffect(() => {
    Axios.get("http://localhost:3000/login")
      .then((response) => {
        console.log("response", response.data)
        setUser(response.data)
      }).catch((error) => {
        console.log("error", error.response.data);
        setUser(error.response.data)

      })

  }, [])

  console.log(user);



  return (
    <>
      <UserContext.Provider value={user}>

        <Header user={user} />

        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Home user={user} />} />

            <Route path='/SignIn' element={<SignIn setUser={setUser} />} />

            <Route path='/WorkerSignUp' element={<WorkerSignUp />} />
            <Route path='/ClientSignUp' element={<ClientSignUp />} />
            <Route path='/WorkerEditProfile' element={<WorkerEditProfile />} />
            <Route path='/ClientEditProfile' element={<ClientEditProfile />} />

            <Route path='/SkillSearch/:id' element={<SkillSearch />} />

            <Route path='/WorkerProfile/:id' element={<WorkerProfile />} />
            <Route path='/Leads' element={<Leads />} />
          </Routes>
        </BrowserRouter>

      </UserContext.Provider>
    </>
  )
}

export default App
