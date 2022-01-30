import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './containers/Home'

function App () {
  return (
    <div>
      <h1>Restaurant</h1>
      <Routes>
        <Route path="/" element={Home}/>
      </Routes>
    </div>
  )
}

export default App
