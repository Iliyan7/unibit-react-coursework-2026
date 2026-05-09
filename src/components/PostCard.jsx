import { Link } from 'react-router-dom'

export default function PostCard({ post }) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 hover:shadow-md transition-shadow">
      <span className="text-xs text-indigo-500 font-semibold uppercase tracking-wide">
        Post #{post.id}
      </span>
      <h3 className="mt-1 text-gray-800 font-semibold capitalize leading-snug line-clamp-2">
        {post.title}
      </h3>
      <p className="mt-2 text-sm text-gray-500 line-clamp-3">{post.body}</p>
      <Link
        to={`/posts/${post.id}`}
        className="mt-4 inline-block text-sm text-indigo-600 font-medium hover:underline"
      >
        Read more →
      </Link>
    </div>
  )
}
