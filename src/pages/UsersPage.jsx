import useFetch from '../hooks/useFetch'
import Spinner from '../components/Spinner'

export default function UsersPage() {
  const { data: users, loading, error } = useFetch('https://jsonplaceholder.typicode.com/users')

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Users</h1>

      {loading && <Spinner />}
      {error && <p className="text-red-500 text-center py-8">Failed to load users.</p>}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {users?.map(user => (
          <div
            key={user.id}
            className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 flex gap-4 items-start"
          >
            <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 font-bold text-lg shrink-0">
              {user.name[0]}
            </div>
            <div>
              <p className="font-semibold text-gray-800">{user.name}</p>
              <p className="text-sm text-gray-400">{user.email}</p>
              <p className="text-sm text-gray-400">{user.phone}</p>
              <p className="text-sm text-indigo-500 mt-1">{user.company.name}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
