export default function Input({ label, error, touched, ...props }) {
  const hasError = touched && error
  return (
    <div className="flex flex-col gap-1">
      {label && (
        <label className="text-sm font-medium text-gray-700" htmlFor={props.id || props.name}>
          {label}
        </label>
      )}
      <input
        {...props}
        className={`border rounded-lg px-3 py-2 text-sm outline-none transition-colors focus:ring-2 ${
          hasError
            ? 'border-red-400 focus:ring-red-200'
            : 'border-gray-300 focus:border-indigo-400 focus:ring-indigo-100'
        }`}
      />
      {hasError && <p className="text-xs text-red-500">{error}</p>}
    </div>
  )
}
