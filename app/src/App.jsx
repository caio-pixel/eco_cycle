import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Create from "./components/createcheck/index"; 
import Home from "./components/inicialpage/Home";
import Account from "./components/principal/p"; 
import Login from "./components/entrar/entrar"; 

function App() {
 
  return (
    <>
    <Router>
      <Routes>
        <Route path="/index" element={<Create />} />
        <Route path="/" element={<Home />} />
        <Route path="/account" element={<Account />} />
        <Route path="/login" element={<Login />} /> 
      </Routes>
    </Router>
    </>
  )
}

export default App
