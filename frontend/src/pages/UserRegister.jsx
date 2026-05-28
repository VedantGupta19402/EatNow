import { Link } from 'react-router-dom'
import { Eye } from 'lucide-react'
import AuthLayout from '../components/AuthLayout'
import AuthCard from '../components/AuthCard'
import InputField from '../components/InputField'
import PrimaryButton from '../components/PrimaryButton';
import axios from "axios"; 
const UserRegister=()=>{
  const onsubmit=async(e)=>{
    e.preventDefault();
    const fullname=e.target.fullName.value;
    const email=e.target.email.value;
    const password=e.target.password.value;
   try {
     const res = await axios.post("http://localhost:4000/api/auth/user/register",{
        fullname,
        email,
        password 
      })
      console.log(res.data)
    } catch(err) {
      console.log(err.response?.data || err.message)
    }  
  }
  return (
    <AuthLayout
      variant="user"
      headline="Join EatNow"
      description="Create your account and start exploring great food."
    >
      <AuthCard>
        <div className="p-6 sm:p-7">
          <div className="flex items-center justify-between gap-4">
            <div>
              <div className="text-2xl font-extrabold tracking-tight text-slate-900">Create account</div>
            </div>
          </div>

          <form className="mt-6 space-y-5" onSubmit={onsubmit}>
            <InputField label="Full Name" name="fullName" placeholder="John Doe" autoComplete="name" required />
            <InputField
              label="Email"
              name="email"
              type="email"
              placeholder="you@company.com"
              autoComplete="email"
              required
            />
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
           

            <PrimaryButton type="submit" className="mt-2">Create account</PrimaryButton>

            <div className="pt-1 text-sm text-slate-600">
              Already have an account?{' '}
              <Link to="/user/login" className="font-semibold text-orange-700 hover:text-orange-800 transition focus:outline-none focus:ring-4 focus:ring-orange-500/15 rounded">
                Log in
              </Link>
            </div>
          </form>
        </div>
      </AuthCard>
    </AuthLayout>
  )
}
export default UserRegister 