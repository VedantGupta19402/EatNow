import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import UserRegister from './pages/UserRegister'
import UserLogin from './pages/UserLogin'
import FoodPartnerRegister from './pages/FoodPartnerRegister'
import FoodPartnerLogin from './pages/FoodPartnerLogin'
import Mainpage from './pages/Mainpage'
import FoodPage from './pages/FoodPage'
const App = () => {
  return (
    <>
      <Routes>
        <Route path="/user/register" element={<UserRegister />} />
        <Route path="/user/login" element={<UserLogin />} />
        <Route path="/foodpartner/register" element={<FoodPartnerRegister />} />
        <Route path="/foodpartner/login" element={<FoodPartnerLogin />} />
        <Route path='/' element={<Mainpage/>}/> 
        <Route path='/createfood' element={<FoodPage/>}/>
      </Routes>
    </>
  )
}

export default App
