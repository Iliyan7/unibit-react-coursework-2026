import { useParams, Link } from 'react-router-dom'
import useFetch from '../hooks/useFetch'
import Spinner from '../components/Spinner'

export default function PostDetailPage() {
  const { id } = useParams()
  const { data: post, loading: loadingPost, error: postError } = useFetch(
    `https://jsonplaceholder.typicode.com/posts/${id}`
  )
  const { data: comments, loading: loadingComments } = useFetch(
    `https://jsonplaceholder.typicode.com/posts/${id}/comments`
  )

  if (loadingPost) return <Spinner />
  if (postError) return <p className="text-red-500 text-center py-8">Failed to load post.</p>
  if (!post) return null

  return (
    <div className="max-w-2xl mx-auto">
      <Link to="/" className="text-indigo-600 text-sm hover:underline">← Back to Posts</Link>

      <article className="mt-4 bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <span className="text-xs text-indigo-500 font-semibold uppercase tracking-wide">
          Post #{post.id}
        </span>
        <h1 className="mt-1 text-xl font-bold text-gray-800 capitalize">{post.title}</h1>
        <p className="mt-4 text-gray-600 leading-relaxed">{post.body}</p>
      </article>

      <section className="mt-8">
        <h2 className="text-lg font-semibold text-gray-700 mb-4">
          Comments {comments && `(${comments.length})`}
        </h2>
        {loadingComments && <Spinner />}
        <div className="flex flex-col gap-3">
          {comments?.map(c => (
            <div key={c.id} className="bg-white rounded-xl border border-gray-100 shadow-sm p-4">
              <div className="flex items-center gap-2 mb-1">
                <div className="w-7 h-7 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-bold text-xs">
                  {c.name[0].toUpperCase()}
                </div>
                <span className="text-sm font-medium text-gray-700">{c.name}</span>
                <span className="text-xs text-gray-400">{c.email}</span>
              </div>
              <p className="text-sm text-gray-500">{c.body}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
