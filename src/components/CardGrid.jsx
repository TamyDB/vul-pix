import { useRef, useEffect, useState } from 'react'

const rarityConfig = {
  'Common':    { badge: 'bg-stone-100 text-stone-500' },
  'Uncommon':  { badge: 'bg-emerald-50 text-emerald-700' },
  'Rare':      { badge: 'bg-blue-50 text-blue-700' },
  'Rare Holo': { badge: 'bg-indigo-50 text-indigo-600' },
}

function CardItem({ card }) {
  const rarity = rarityConfig[card.rarity] ?? rarityConfig['Common']

  return (
    <div className="bg-white border border-stone-200/80 rounded-2xl overflow-hidden flex flex-col cursor-pointer transition-all duration-200 ease-out hover:-translate-y-1 hover:shadow-xl hover:shadow-black/10">
      {/* Imagem */}
      <div className="bg-stone-50 flex justify-center items-center p-4">
        {card.image
          ? <img
              src={card.image}
              alt={card.name}
              className="h-40 object-contain rounded-md"
            />
          : <div className="h-40 w-28 bg-stone-200 rounded-md" />
        }
      </div>

      {/* Info */}  
      <div className="p-3 flex flex-col gap-1.5 flex-1">
        <p className="m-0 font-semibold text-sm text-stone-900 leading-tight">
          {card.name ?? '—'}
        </p>

        <div className="flex items-center justify-between gap-2">
          <span className={`text-[11px] font-medium px-2 py-0.5 rounded-full ${rarity.badge}`}>
            {card.rarity ?? 'Unknown'}
          </span>
          <span className="text-xs text-stone-400 font-mono">
            {card.TCGAPIID}
          </span>
        </div>

        {card.price > 0 && (
          <p className="m-0 text-sm text-green-700 font-semibold">
            R$ {card.price.toFixed(2)}
          </p>
        )}
      </div>
    </div>
  )
}

export default function CardGrid({ cards = [] }) {
  const containerRef = useRef(null)
  const [cols, setCols] = useState(4)

  useEffect(() => {
    const observer = new ResizeObserver(([entry]) => {
      const w = entry.contentRect.width
      if (w > 700)      setCols(4)
      else if (w > 500) setCols(3)
      else if (w > 300) setCols(2)
      else              setCols(1)
    })
    if (containerRef.current) observer.observe(containerRef.current)
    return () => observer.disconnect()
  }, [])

  if (cards.length === 0) {
    return (
      <div className="text-center py-12 text-stone-400 text-sm">
        Nenhuma carta carregada.
      </div>
    )
  }

  return (
    <div
      ref={containerRef}
      className="grid gap-4 p-4"
      style={{ gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))` }}
    >
      {cards.map(card => (
        <CardItem key={card.TCGAPIID} card={card} />
      ))}
    </div>
  )
}