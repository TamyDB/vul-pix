export default function SectionTitle({ label, heading, className = '' }) {
  return (
    <div className={`flex flex-col gap-1 ${className}`}>
      {label   && <p  className="text-brand-500 text-sm font-medium">{label}</p>}
      {heading && <h2 className="text-brand-900 text-2xl font-bold leading-snug">{heading}</h2>}
    </div>
  )
}
