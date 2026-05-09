import { useState } from 'react'
import useFetch from '../hooks/useFetch'
import Spinner from '../components/Spinner'

const PAGE_SIZE = 24

export default function GalleryPage() {
  const [page, setPage] = useState(1)
  const [selected, setSelected] = useState(null)

  const { data: photos, loading, error } = useFetch(
    `https://jsonplaceholder.typicode.com/photos?_start=${(page - 1) * PAGE_SIZE}&_limit=${PAGE_SIZE}`
  )

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Gallery</h1>

      {loading && <Spinner />}
      {error && <p className="text-red-500 text-center py-8">Failed to load photos.</p>}

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
        {photos?.map(photo => (
          <button
            key={photo.id}
            onClick={() => setSelected(photo)}
            className="group relative aspect-square overflow-hidden rounded-xl bg-gray-100 hover:ring-2 hover:ring-indigo-400 transition-all"
          >
            <img
              src={`https://picsum.photos/seed/${photo.id}/150/150`}
              alt={photo.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
            />
          </button>
        ))}
      </div>

      {!loading && (
        <div className="flex items-center justify-center gap-4 mt-8">
          <button
            onClick={() => setPage(p => Math.max(1, p - 1))}
            disabled={page === 1}
            className="px-4 py-2 rounded-lg border border-gray-300 text-sm font-medium text-gray-600 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
          >
            ← Previous
          </button>
          <span className="text-sm text-gray-500">Page {page}</span>
          <button
            onClick={() => setPage(p => p + 1)}
            className="px-4 py-2 rounded-lg border border-gray-300 text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors"
          >
            Next →
          </button>
        </div>
      )}

      {selected && (
        <div
          className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4"
          onClick={() => setSelected(null)}
        >
          <div
            className="bg-white rounded-2xl overflow-hidden max-w-sm w-full shadow-2xl"
            onClick={e => e.stopPropagation()}
          >
            <img src={`https://picsum.photos/seed/${selected.id}/600/400`} alt={selected.title} className="w-full" />
            <div className="p-4">
              <p className="text-sm text-gray-600 capitalize">{selected.title}</p>
              <p className="text-xs text-gray-400 mt-1">Album #{selected.albumId}</p>
            </div>
            <button
              onClick={() => setSelected(null)}
              className="w-full py-3 text-sm font-medium text-indigo-600 hover:bg-indigo-50 transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
