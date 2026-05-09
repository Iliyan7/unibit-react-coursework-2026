import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import useForm from '../hooks/useForm'
import Input from '../components/Input'

function validate(values) {
  const errors = {}
  if (!values.name.trim()) errors.name = 'Name is required'
  if (!values.email.trim()) errors.email = 'Email is required'
  else if (!/\S+@\S+\.\S+/.test(values.email)) errors.email = 'Invalid email address'
  if (!values.password) errors.password = 'Password is required'
  else if (values.password.length < 6) errors.password = 'Minimum 6 characters'
  if (values.confirm !== values.password) errors.confirm = 'Passwords do not match'
  return errors
}

export default function RegisterPage() {
  const { register } = useAuth()
  const navigate = useNavigate()
  const [serverError, setServerError] = useState('')

  const { values, errors, touched, handleChange, handleBlur, isValid } = useForm(
    { name: '', email: '', password: '', confirm: '' },
    validate
  )

  async function handleSubmit(e) {
    e.preventDefault()
    setServerError('')
    if (!isValid()) return
    try {
      register(values)
      navigate('/')
    } catch (err) {
      setServerError(err.message)
    }
  }

  return (
    <div className="min-h-[80vh] flex items-center justify-center">
      <div className="w-full max-w-sm bg-white rounded-2xl shadow-md p-8">
        <h1 className="text-2xl font-bold text-gray-800 mb-1">Create account</h1>
        <p className="text-sm text-gray-500 mb-6">Start exploring today</p>

        {serverError && (
          <div className="mb-4 bg-red-50 border border-red-200 text-red-600 text-sm rounded-lg px-4 py-3">
            {serverError}
          </div>
        )}

        <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4">
          <Input
            label="Full name"
            type="text"
            name="name"
            id="name"
            placeholder="Jane Doe"
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
            placeholder="you@example.com"
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
            error={errors.email}
            touched={touched.email}
          />
          <Input
            label="Password"
            type="password"
            name="password"
            id="password"
            placeholder="••••••••"
            value={values.password}
            onChange={handleChange}
            onBlur={handleBlur}
            error={errors.password}
            touched={touched.password}
          />
          <Input
            label="Confirm password"
            type="password"
            name="confirm"
            id="confirm"
            placeholder="••••••••"
            value={values.confirm}
            onChange={handleChange}
            onBlur={handleBlur}
            error={errors.confirm}
            touched={touched.confirm}
          />
          <button
            type="submit"
            className="mt-2 w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2.5 rounded-lg transition-colors"
          >
            Register
          </button>
        </form>

        <p className="mt-5 text-center text-sm text-gray-500">
          Already have an account?{' '}
          <Link to="/login" className="text-indigo-600 font-medium hover:underline">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  )
}
