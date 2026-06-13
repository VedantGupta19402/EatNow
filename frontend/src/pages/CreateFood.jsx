import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, UploadCloud } from 'lucide-react'
import AuthLayout from '../components/AuthLayout'
import AuthCard from '../components/AuthCard'
import InputField from '../components/InputField'
import PrimaryButton from '../components/PrimaryButton'
import axios from 'axios'

const CreateFood = () => {
  const navigate = useNavigate()
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [videoFile, setVideoFile] = useState(null)
  const [videoPreview, setVideoPreview] = useState(null)
  const [loading, setLoading] = useState(false)
  const [statusMsg, setStatusMsg] = useState({ type: '', text: '' })

  const handleFileChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      if (!file.type.startsWith('video/')) {
        setStatusMsg({ type: 'error', text: 'Please select a valid video file.' })
        return
      }
      setVideoFile(file)
      setVideoPreview(URL.createObjectURL(file))
      setStatusMsg({ type: '', text: '' })
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!name.trim() || !description.trim()) {
      setStatusMsg({
        type: 'error',
        text: 'Please provide both a dish name and description.',
      })
      return
    }
    if(!videoFile){
      setStatusMsg({ type: 'error', text: 'Please upload a video file of your dish.' })
      return
    }
    const formData = new FormData()
    formData.append('name', name.trim())
    formData.append('description', description.trim())
    formData.append('video', videoFile)
    const token = localStorage.getItem('foodpartnerToken')
    if (!token) {
      setStatusMsg({
        type: 'error',
        text: 'No auth token found. Please log in again as a food partner.',
      })
      return
    }

    setLoading(true)
    setStatusMsg({ type: 'info', text: 'Uploading gourmet video and creating dish...' })

    const headers = {
      Authorization: `Bearer ${token}`,
    }

    try {
      const res = await axios.post('http://localhost:4000/api/food', formData, {
        headers,
        withCredentials: true,
      })

      console.log(res.data)
      setStatusMsg({ type: 'success', text: 'Dish created successfully! Redirecting...' })
      setTimeout(() => {
        navigate('/')
      }, 2000)
    } catch (error) {
      console.error(error)
      const errText = error.response?.data?.message || 'Failed to create food item. Make sure you are logged in.'
      setStatusMsg({ type: 'error', text: errText })
    } finally {
      setLoading(false)
    }
  }

  return (
    <AuthLayout
      variant="partner"
      headline="Publish Gourmet Videos"
      description="Showcase your signature dishes in action to millions of hungry foodies."
    >
      <AuthCard>
        <div className="p-6 sm:p-7">
          <div className="flex items-center gap-2 mb-4">
            <button
              onClick={() => navigate('/foodpartner/login')}
              className="p-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 transition"
              aria-label="Back to Login"
            >
              <ArrowLeft size={16} />
            </button>
            <span className="text-xs uppercase font-extrabold tracking-widest text-orange-600">
              Food Partner Dashboard
            </span>
          </div>

          <div className="text-2xl font-extrabold tracking-tight text-slate-900 mb-6">
            Create Food Listing
          </div>

          {statusMsg.text && (
            <div
              className={`mb-6 p-4 rounded-xl border text-sm font-medium ${
                statusMsg.type === 'error'
                  ? 'bg-rose-50 border-rose-200 text-rose-700'
                  : statusMsg.type === 'success'
                  ? 'bg-emerald-50 border-emerald-200 text-emerald-700'
                  : 'bg-orange-50 border-orange-200 text-orange-700'
              }`}
            >
              {statusMsg.text}
            </div>
          )}
          <form className="space-y-5" onSubmit={handleSubmit}>
            <InputField
              label="Dish Name"
              name="foodName"
              placeholder="e.g., Spicy Szechuan Noodles"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <div className="space-y-2">
              <label className="block text-sm font-semibold text-slate-900/90">
                Dish Description
                <span className="text-orange-500/90"> *</span>
              </label>
              <textarea
                name="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Describe your mouthwatering recipe, its ingredients, and special preparation..."
                rows="3"
                required
                className="w-full rounded-xl border bg-white/70 backdrop-blur border-slate-200/80 hover:border-slate-300/90 px-3 py-3 text-slate-900 placeholder:text-slate-500/80 focus:outline-none focus:ring-4 focus:ring-orange-500/15 transition resize-none"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-semibold text-slate-900/90">
                Promotional Video
                <span className="text-orange-500/90"> *</span>
              </label>

              <div className="relative border-2 border-dashed border-slate-300 rounded-xl hover:border-orange-500 transition cursor-pointer bg-slate-50/50 hover:bg-slate-50">
                <input
                  type="file"
                  accept="video/*"
                  onChange={handleFileChange}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />

                {!videoPreview ? (
                  <div className="p-8 text-center flex flex-col items-center justify-center gap-2">
                    <UploadCloud size={40} className="text-slate-400" />
                    <span className="text-sm font-semibold text-slate-700">
                      Drag and drop your recipe video here
                    </span>
                    <span className="text-xs text-slate-500">
                      or click to browse local files (MP4, WebM, etc.)
                    </span>
                  </div>
                ) : (
                  <div className="p-4">
                    <div className="rounded-lg overflow-hidden bg-black max-h-48 flex items-center justify-center relative">
                      <video
                        src={videoPreview}
                        controls
                        className="max-h-48 w-auto object-contain"
                      />
                    </div>
                    <div className="mt-2 text-xs text-slate-600 flex items-center justify-between">
                      <span className="truncate max-w-[200px] font-medium">
                        {videoFile.name}
                      </span>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation()
                          setVideoFile(null)
                          setVideoPreview(null)
                        }}
                        className="text-rose-600 hover:text-rose-700 font-bold"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <PrimaryButton type="submit" disabled={loading}>
              {loading ? 'Uploading & Creating...' : 'Publish to Feed'}
            </PrimaryButton>
          </form>
        </div>
      </AuthCard>
    </AuthLayout>
  )
}

export default CreateFood