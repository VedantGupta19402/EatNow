import { Link, useNavigate } from 'react-router-dom'
import React from 'react'
import { Eye } from 'lucide-react'
import AuthLayout from '../components/AuthLayout'
import AuthCard from '../components/AuthCard'
import InputField from '../components/InputField'
import PrimaryButton from '../components/PrimaryButton'
import axios from 'axios'
const FoodPartnerRegister=()=>{
  const onhandlesubmit=async (e)=>{
    const navigate=useNavigate()
e.preventDefault()
  const restaurantName=e.target.restaurantName.value
  const fullname=e.target.fullname.value
  const email=e.target.email.value
  const phone=e.target.phone.value
  const address=e.target.address.value
  const password=e.target.password.value
  try{
    const res=await axios.post('http://localhost:4000/api/auth/foodpartner/register',
      {restaurantName,fullname,email,phone,address,password},{
        withCredentials:true
      })
    console.log(res.data)
  }
  catch(error){
    console.log(error)
  }
  navigate("/createfood")
  }
  return (
    <AuthLayout
      variant="partner"
      headline="Grow with EatNow"
      description="Register your restaurant and start serving more customers."
    >
      <AuthCard>
        <div className="p-6 sm:p-7">
          <div className="flex items-center justify-between gap-4">
            <div className="text-2xl font-extrabold tracking-tight text-slate-900">Restaurant registration</div>
          </div>

          <form className="mt-6 space-y-5" onSubmit={onhandlesubmit}>
            <InputField label="Restaurant Name" name="restaurantName" placeholder="e.g., Spicy House" autoComplete="organization" required />
            <InputField label="Owner Name" name="fullname" placeholder="e.g., Arjun Patel" autoComplete="name" required />
            <InputField label="Email" name="email" type="email" placeholder="owner@restaurant.com" autoComplete="email" required />
            <InputField label="Phone Number" name="phone" type="tel" placeholder="e.g., +91 98765 43210" autoComplete="tel" required />
            <InputField label="Address" name="address" placeholder="Door no., Street, City" autoComplete="street-address" required />

            <InputField
              label="Password"
              name="password"
              type="password"
              placeholder="Create a password"
              autoComplete="new-password"
              required
              rightElement={
                <button
                  type="button"
                  className="rounded-lg p-1.5 text-slate-700/80 hover:text-slate-900 hover:bg-slate-900/5 transition focus:outline-none focus:ring-4 focus:ring-orange-500/20"
                  aria-label="Show password (visual only)"
                >
                  <Eye size={18} aria-hidden="true" />
                </button>
              }
            />
            <PrimaryButton type="submit">Register restaurant</PrimaryButton>

            <div className="pt-1 text-sm text-slate-600">
              Already partnered?{' '}
              <Link
                to="/foodpartner/login"
                className="font-semibold text-orange-700 hover:text-orange-800 transition focus:outline-none focus:ring-4 focus:ring-orange-500/15 rounded"
              >
                Partner login
              </Link>
            </div>
          </form>
        </div>
      </AuthCard>
    </AuthLayout>
  )
}
export default FoodPartnerRegister

