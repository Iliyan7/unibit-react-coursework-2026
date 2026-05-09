import { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import useForm from '../hooks/useForm'
import Input from '../components/Input'

function validate(values) {
  const errors = {}
  if (!values.name.trim()) errors.name = 'Name is required'
  if (!values.email.trim()) errors.email = 'Email is required'
  else if (!/\S+@\S+\.\S+/.test(values.email)) errors.email = 'Invalid email'
  return errors
}

export default function ProfilePage() {
  const { user } = useAuth()
  const [saved, setSaved] = useState(false)

  const { values, errors, touched, handleChange, handleBlur, isValid } = useForm(
    { name: user.name, email: user.email },
    validate
  )

  function handleSubmit(e) {
    e.preventDefault()
    if (!isValid()) return
    setSaved(true)
    setTimeout(() => setSaved(false), 3000)
  }

  return (
    <div className="max-w-md mx-auto">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Profile</h1>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-14 h-14 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 font-bold text-2xl">
            {user.name[0].toUpperCase()}
          </div>
          <div>
            <p className="font-semibold text-gray-800">{user.name}</p>
            <p className="text-sm text-gray-400">{user.email}</p>
          </div>
        </div>

        {saved && (
          <div className="mb-4 bg-green-50 border border-green-200 text-green-600 text-sm rounded-lg px-4 py-3">
            Profile updated successfully!
          </div>
        )}

        <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4">
          <Input
            label="Full name"
            type="text"
            name="name"
            id="name"
            value={values.name}
            onChange={handleChange}
            onBlur={handleBlur}
            error={errors.name}
            touched={touched.name}
          />
          <Input
            label="Email"
            type="email"
            name="email"
            id="email"
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
            error={errors.email}
            touched={touched.email}
          />
          <button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2.5 rounded-lg transition-colors"
          >
            Save changes
          </button>
        </form>
      </div>
    </div>
  )
}
