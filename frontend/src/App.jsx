import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import UserRegister from './pages/UserRegister'
import UserLogin from './pages/UserLogin'
import FoodPartnerRegister from './pages/FoodPartnerRegister'
import FoodPartnerLogin from './pages/FoodPartnerLogin'
const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Navigate to="/user/login" replace />} />
        <Route path="/user/register" element={<UserRegister />} />
        <Route path="/user/login" element={<UserLogin />} />
        <Route path="/foodpartner/register" element={<FoodPartnerRegister />} />
        <Route path="/foodpartner/login" element={<FoodPartnerLogin />} />
      </Routes>
    </>
  )
}

export default App
