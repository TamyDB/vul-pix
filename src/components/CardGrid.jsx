import { useState } from 'react'
import { FiHeart, FiShoppingCart } from 'react-icons/fi'
import Badge from './ui/Badge'
import Button from './ui/Button'
import { useCart } from '../context/CartContext'

const DISCOUNT_OPTIONS = [10, 15, 20, 25, 30]

function CardItem({ card, onCardClick }) {
  const { addItem } = useCart()

  const [originalPrice] = useState(() => +(Math.random() * 280 + 9.9).toFixed(2))
  const [discount] = useState(() => {
    if (Math.random() > 0.35) return 0
    return DISCOUNT_OPTIONS[Math.floor(Math.random() * DISCOUNT_OPTIONS.length)]
  })
  const [liked, setLiked] = useState(false)

  const finalPrice = discount > 0
    ? +(originalPrice * (1 - discount / 100)).toFixed(2)
    : originalPrice

  const fmtPrice = (v) => v.toLocaleString('pt-BR', { minimumFractionDigits: 2 })

  const handleAddToCart = (e) => {
    e.stopPropagation()
    addItem(card, finalPrice, discount)
  }

  return (
    <div
      className="group bg-white rounded-2xl overflow-hidden flex flex-col cursor-pointer shadow-card hover:shadow-card-lg transition-shadow duration-300"
      onClick={() => onCardClick(card)}
    >
      {/* ── Área da imagem ── */}
      <div className="relative overflow-hidden bg-linear-to-b from-slate-100 to-slate-50 flex justify-center items-end aspect-3/4 px-6 pt-8">

        {discount > 0 && (
          <div className="absolute top-3 left-3 z-10 bg-rose-500 text-white text-sm font-bold px-2.5 py-1 rounded-full shadow-md tracking-wide">
            −{discount}% OFF
          </div>
        )}

        <button
          className="absolute top-3 right-3 z-10 w-8 h-8 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-sm hover:bg-white transition-all duration-150"
          onClick={e => { e.stopPropagation(); setLiked(l => !l) }}
        >
          <FiHeart
            size={14}
            className={liked ? 'fill-rose-500 text-rose-500' : 'text-stone-400'}
            style={{ transition: 'fill 0.15s, color 0.15s' }}
          />
        </button>

        {card.image
          ? (
            <img
              src={card.image}
              alt={card.name}
              className="h-full w-auto object-contain drop-shadow-xl transition-transform duration-500 ease-out group-hover:scale-110 group-hover:-translate-y-3"
            />
          )
          : <div className="h-full w-full bg-slate-200 rounded-xl flex items-center justify-center p-4" />
        }
      </div>

      {/* ── Informações ── */}
      <div className="px-4 pt-3 pb-4 flex flex-col gap-1.5 flex-1 border-t border-stone-100">

        <div className="flex items-start justify-between gap-2">
          <p className="font-semibold text-sm text-stone-900 leading-snug">
            {card.name ?? '—'}
          </p>
          <Badge rarity={card.rarity} />
        </div>

        <div className="mt-auto pt-2 flex items-center justify-between gap-3">
          <div className="flex flex-col leading-none gap-0.5">
            {discount > 0 && (
              <span className="text-xs text-stone-400 line-through">
                R$ {fmtPrice(originalPrice)}
              </span>
            )}
            <span className={`text-lg font-bold ${discount > 0 ? 'text-rose-600' : 'text-stone-900'}`}>
              R$ {fmtPrice(finalPrice)}
            </span>
          </div>

          <Button variant="icon" size="lg" onClick={handleAddToCart}>
            <FiShoppingCart size={17} />
          </Button>
        </div>
      </div>
    </div>
  )
}

export default function CardGrid({ cards = [], onCardClick }) {
  if (cards.length === 0) {
    return (
      <div className="text-center py-16 text-stone-400 text-sm">
        Nenhuma carta carregada.
      </div>
    )
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 p-2">
      {cards.map(card => (
        <CardItem key={card.TCGAPIID} card={card} onCardClick={onCardClick} />
      ))}
    </div>
  )
}
