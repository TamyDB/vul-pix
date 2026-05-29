const base =
  'inline-flex items-center justify-center font-semibold rounded-lg cursor-pointer select-none transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2'

const variants = {
  primary:   'bg-brand-500 text-white hover:opacity-90 disabled:opacity-50',
  secondary: 'bg-white text-brand-500 border-2 border-brand-800 hover:opacity-85',
  ghost:     'bg-transparent text-brand-500 hover:bg-brand-50',
  icon:      'rounded-full bg-brand-500 text-white shadow-lg hover:brightness-110 active:scale-90',
}

const sizes = {
  sm: 'px-4 py-1.5 text-sm',
  md: 'px-6 py-2 text-base',
  lg: 'px-8 py-3 text-lg',
}

const iconSizes = {
  sm: 'w-7 h-7',
  md: 'w-9 h-9',
  lg: 'w-11 h-11',
}

export default function Button({
  variant = 'primary',
  size = 'md',
  type = 'button',
  disabled = false,
  onClick,
  className = '',
  children,
}) {
  const sizeClass = variant === 'icon' ? iconSizes[size] : sizes[size]
  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={`${base} ${variants[variant]} ${sizeClass} ${className}`}
    >
      {children}
    </button>
  )
}
