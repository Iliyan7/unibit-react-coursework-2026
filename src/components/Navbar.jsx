import { NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function Navbar() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  function handleLogout() {
    logout()
    navigate('/login')
  }

  const linkClass = ({ isActive }) =>
    `px-3 py-2 rounded-md text-sm font-medium transition-colors ${
      isActive
        ? 'bg-indigo-700 text-white'
        : 'text-indigo-100 hover:bg-indigo-500 hover:text-white'
    }`

  return (
    <nav className="bg-indigo-600 shadow">
      <div className="max-w-5xl mx-auto px-4 flex items-center justify-between h-14">
        <div className="flex items-center gap-1">
          <span className="text-white font-bold text-lg mr-4">ReactDemo</span>
          <NavLink to="/" className={linkClass}>Posts</NavLink>
          <NavLink to="/users" className={linkClass}>Users</NavLink>
          <NavLink to="/profile" className={linkClass}>Profile</NavLink>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-indigo-200 text-sm hidden sm:block">
            {user?.name}
          </span>
          <button
            onClick={handleLogout}
            className="bg-indigo-800 hover:bg-indigo-900 text-white text-sm px-3 py-1.5 rounded-md transition-colors"
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  )
}
