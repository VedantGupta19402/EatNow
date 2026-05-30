import { Link } from 'react-router-dom'
import React from 'react'
import { Eye } from 'lucide-react'
import AuthLayout from '../components/AuthLayout'
import AuthCard from '../components/AuthCard'
import InputField from '../components/InputField'
import PrimaryButton from '../components/PrimaryButton'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
const FoodPartnerLogin=()=>{
  const navigate=useNavigate()
  const onhandlesubmit=async(e)=>{
    e.preventDefault()
    const email=e.target.email.value
    const password=e.target.password.value
    try{
      const res=await axios.post('http://localhost:4000/api/auth/foodpartner/login',
        {email,password},{
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
      headline="Partner Login"
      description="Manage orders, menus, and your restaurant on EatNow."
    >
      <AuthCard>
        <div className="p-6 sm:p-7">
          <div className="flex items-center justify-between gap-4">
            <div className="text-2xl font-extrabold tracking-tight text-slate-900">Restaurant login</div>
          </div>

          <form className="mt-6 space-y-5" onSubmit={onhandlesubmit}>
            <InputField
              label="Restaurant Email"
              name="email"
              type="email"
              placeholder="partner@restaurant.com"
              autoComplete="email"
              required
            />
            <InputField
              label="Password"
              name="password"
              type="password"
              placeholder="Your password"
              autoComplete="current-password"
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

            <div className="flex items-center justify-between gap-3">
              <label className="inline-flex items-center gap-2 text-sm text-slate-700 select-none">
                <input
                  type="checkbox"
                  className="h-4 w-4 rounded border-slate-300 text-orange-500 focus:ring-orange-500/20"
                  aria-label="Remember me"
                />
                <span className="leading-none">Remember me</span>
              </label>

              <Link
                to="/foodpartner/login"
                className="text-sm font-semibold text-slate-700 hover:text-orange-700 transition focus:outline-none focus:ring-4 focus:ring-orange-500/15 rounded"
              >
                Forgot password?
              </Link>
            </div>

            <PrimaryButton type='submit'>Continue</PrimaryButton>

            <div className="pt-1 text-sm text-slate-600">
              New partner?{' '}
              <Link
                to="/foodpartner/register"
                className="font-semibold text-orange-700 hover:text-orange-800 transition focus:outline-none focus:ring-4 focus:ring-orange-500/15 rounded"
              >
                Create a restaurant account
              </Link>
            </div>
          </form>
        </div>
      </AuthCard>
    </AuthLayout>
  )
}
export default FoodPartnerLogin

