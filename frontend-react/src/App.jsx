import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min.js'

import { BrowserRouter, Route, Routes } from 'react-router-dom'

import './css/Home.css'

import './css/bootstrap.min.css'
import './css/style.css'
import './css/sign-in.css'
// import './css/sign-up.css'
import './css/electricidad.css'

import Home from './pages/Home'
import SignIn from './pages/SignIn'
import WorkerSignUp from './pages/WorkerSignUp'
import ClientSignUp from './pages/ClientSignUp'
import WorkerEditProfile from './pages/WorkerEditProfile'
import ClientEditProfile from './pages/ClientEditProfile'
import SkillSearch from './pages/SkillSearch'

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element = {<Home/>} />
          <Route path='/SignIn' element = {<SignIn />} />
          <Route path='/WorkerSignUp' element = {<WorkerSignUp />} />
          <Route path='/ClientSignUp' element = {<ClientSignUp />} />
          <Route path='/WorkerEditProfile' element = {<WorkerEditProfile />} />
          <Route path='/ClientEditProfile' element = {<ClientEditProfile />} />
          <Route path='/SkillSearch' element = {<SkillSearch />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
