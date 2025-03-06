
import { Route, Routes } from 'react-router-dom'
import './App.css'
import Navbar from './Pages/Common/Navbar'
import Login from './Pages/Login'
import Home from './Pages/Home'
import SignUp from './Pages/SignUp'

function App() {
  

  return (
    <>
      <Navbar/>
      <Routes>
        <Route path='/login' element={<Login/>}/>
        <Route path='/' element={<Home/>}/>
        <Route path='/signup' element={<SignUp/>}/>
      </Routes>
    </>
  )
}

export default App
