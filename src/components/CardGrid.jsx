// components/CardGrid.jsx
import { useRef, useEffect, useState } from 'react'

const rarityColor = {
  'Common':    { bg: '#f1efe8', text: '#5f5e5a' },
  'Uncommon':  { bg: '#e1f5ee', text: '#0f6e56' },
  'Rare':      { bg: '#e6f1fb', text: '#185fa5' },
  'Rare Holo': { bg: '#eeedfe', text: '#534ab7' },
}

function CardItem({ card }) {
  const r = rarityColor[card.rarity] ?? { bg: '#f1efe8', text: '#5f5e5a' }

  return (
    <div style={{
      background: '#fff',
      border: '0.5px solid #e0ddd6',
      borderRadius: '14px',
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column',
      transition: 'transform 0.18s ease, box-shadow 0.18s ease',
      cursor: 'pointer',
    }}
      onMouseEnter={e => {
        e.currentTarget.style.transform = 'translateY(-4px)'
        e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,0,0,0.10)'
      }}
      onMouseLeave={e => {
        e.currentTarget.style.transform = ''
        e.currentTarget.style.boxShadow = ''
      }}
    >
      {/* Imagem */}
      <div style={{ background: '#f7f5f0', display: 'flex', justifyContent: 'center', padding: '1rem' }}>
        {card.image
          ? <img src={card.image} alt={card.name} style={{ height: '160px', objectFit: 'contain', borderRadius: '6px' }} />
          : <div style={{ height: '160px', width: '110px', background: '#e8e5de', borderRadius: '6px' }} />
        }
      </div>

      {/* Info */}
      <div style={{ padding: '0.75rem 1rem', display: 'flex', flexDirection: 'column', gap: '6px', flex: 1 }}>
        <p style={{ margin: 0, fontWeight: 600, fontSize: '15px', color: '#1a1a1a' }}>
          {card.name ?? '—'}
        </p>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span style={{
            fontSize: '11px', fontWeight: 500, padding: '2px 8px',
            borderRadius: '999px', background: r.bg, color: r.text,
          }}>
            {card.rarity ?? 'Unknown'}
          </span>

          <span style={{ fontSize: '13px', color: '#888', fontFamily: 'monospace' }}>
            {card.TCGAPIID}
          </span>
        </div>

        {card.price > 0 && (
          <p style={{ margin: 0, fontSize: '14px', color: '#3b6d11', fontWeight: 600 }}>
            R$ {card.price.toFixed(2)}
          </p>
        )}
      </div>
    </div>
  )
}

export default function CardGrid({ cards = [] }) {
  const containerRef = useRef(null)
  const [cols, setCols] = useState(3)

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
      <div style={{ textAlign: 'center', padding: '3rem', color: '#aaa', fontSize: '14px' }}>
        Nenhuma carta carregada.
      </div>
    )
  }

  return (
    <div
      ref={containerRef}
      style={{
        display: 'grid',
        gridTemplateColumns: `repeat(${cols}, 1fr)`,
        gap: '1rem',
        padding: '1rem',
      }}
    >
      {cards.map(card => (
        <CardItem key={card.TCGAPIID} card={card} />
      ))}
    </div>
  )
}