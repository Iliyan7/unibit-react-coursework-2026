import { useState, useMemo } from 'react'
import useFetch from '../hooks/useFetch'
import PostCard from '../components/PostCard'
import Spinner from '../components/Spinner'

const API = 'https://jsonplaceholder.typicode.com/posts'

export default function PostsPage() {
  const { data: posts, loading, error } = useFetch(API)
  const [search, setSearch] = useState('')

  const filtered = useMemo(() => {
    if (!posts) return []
    const q = search.toLowerCase()
    return posts.filter(p => p.title.includes(q) || p.body.includes(q))
  }, [posts, search])

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Posts</h1>
        <input
          type="search"
          placeholder="Search posts..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="border border-gray-300 rounded-lg px-3 py-2 text-sm w-full sm:w-64 focus:outline-none focus:ring-2 focus:ring-indigo-200 focus:border-indigo-400"
        />
      </div>

      {loading && <Spinner />}
      {error && (
        <p className="text-center text-red-500 py-8">Failed to load posts: {error}</p>
      )}
      {!loading && !error && filtered.length === 0 && (
        <p className="text-center text-gray-400 py-8">No posts match your search.</p>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map(post => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
    </div>
  )
}
