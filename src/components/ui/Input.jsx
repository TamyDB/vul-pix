const defaultClass =
  'w-full border border-gray-300 rounded-lg px-3 py-2 bg-white focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500 placeholder:text-gray-400 transition'

const searchClass =
  'w-full bg-transparent border-none outline-none px-1 py-1.5'

const errorBorderClass = 'border-red-400 focus:border-red-400 focus:ring-red-400'

export default function Input({
  type = 'text',
  placeholder,
  value,
  onChange,
  error,
  required = false,
  variant = 'default',
  className = '',
}) {
  const base = variant === 'search' ? searchClass : defaultClass
  const errorClass = error && variant !== 'search' ? errorBorderClass : ''
  return (
    <div className="w-full">
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required={required}
        className={`${base} ${errorClass} ${className}`}
      />
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  )
}
