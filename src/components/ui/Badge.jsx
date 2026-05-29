const rarityClasses = {
  'Common':         'bg-stone-100 text-stone-600',
  'Uncommon':       'bg-emerald-100 text-emerald-700',
  'Rare':           'bg-blue-100 text-blue-700',
  'Rare Holo':      'bg-indigo-100 text-indigo-700',
  'Holo Rare':      'bg-yellow-100 text-yellow-700',
  'Holo Rare V':    'bg-purple-100 text-purple-700',
  'Holo Rare VMAX': 'bg-rose-100 text-rose-700',
  'Promo':          'bg-orange-100 text-orange-700',
}

export default function Badge({ rarity, className = '' }) {
  const colorClass = rarityClasses[rarity] ?? rarityClasses['Common']
  return (
    <span className={`text-[11px] font-semibold px-2.5 py-1 rounded-full shrink-0 ${colorClass} ${className}`}>
      {rarity ?? 'Unknown'}
    </span>
  )
}
