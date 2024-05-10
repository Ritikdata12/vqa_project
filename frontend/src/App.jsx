import react  from 'react'
import { BrowserRouter as Router , Routes, Route } from 'react-router-dom'
import './App.css'
import Register from './components/Register'
import Login from './components/Login'
import axios from 'axios'
import Prac from './components/Prac'
import King from './components/King'

function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Register/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/prac' element={<Prac/>}/>
          <Route path='/king' element={<King/>}/>
        </Routes>
      </Router>
    </>
  )
}

export default App
