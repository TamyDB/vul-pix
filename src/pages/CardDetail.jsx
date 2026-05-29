import { useState, useEffect } from 'react'
import { useLocation, useNavigate, useParams, Link } from 'react-router-dom'
import { FiChevronLeft, FiShoppingCart, FiHeart } from 'react-icons/fi'
import TCGdex from '@tcgdex/sdk'
import Card from '../models/Card'
import CardGrid from '../components/CardGrid'
import SectionWrap from '../components/SectionWrap'
import Badge from '../components/ui/Badge'
import Button from '../components/ui/Button'
import { useCart } from '../context/CartContext'

const tcgdex = new TCGdex('en')

const DISCOUNT_OPTIONS = [10, 15, 20, 25, 30]

const TYPE_BADGE = {
  Colorless: 'bg-stone-100 text-stone-600',
  Fire:      'bg-red-100   text-red-700',
  Water:     'bg-sky-100   text-sky-700',
  Grass:     'bg-green-100 text-green-700',
  Lightning: 'bg-yellow-100 text-yellow-700',
  Psychic:   'bg-purple-100 text-purple-700',
  Fighting:  'bg-orange-100 text-orange-700',
  Darkness:  'bg-neutral-800 text-white',
  Metal:     'bg-slate-200 text-slate-700',
  Dragon:    'bg-indigo-100 text-indigo-700',
  Fairy:     'bg-pink-100  text-pink-700',
}

const TYPE_BG = {
  Colorless: 'from-stone-50   to-zinc-100',
  Fire:      'from-red-50     to-orange-100',
  Water:     'from-sky-50     to-blue-100',
  Grass:     'from-green-50   to-emerald-100',
  Lightning: 'from-yellow-50  to-amber-100',
  Psychic:   'from-purple-50  to-pink-100',
  Fighting:  'from-orange-50  to-red-100',
  Darkness:  'from-slate-100  to-slate-200',
  Metal:     'from-slate-50   to-zinc-100',
  Dragon:    'from-indigo-50  to-violet-100',
  Fairy:     'from-pink-50    to-rose-100',
}

function fmt(v) {
  return v.toLocaleString('pt-BR', { minimumFractionDigits: 2 })
}

function TypeBadge({ type }) {
  return (
    <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${TYPE_BADGE[type] ?? TYPE_BADGE.Colorless}`}>
      {type}
    </span>
  )
}

function EnergyCost({ cost = [] }) {
  return (
    <div className="flex gap-1">
      {cost.map((type, i) => (
        <span
          key={i}
          title={type}
          className={`w-5 h-5 rounded-full text-[9px] font-bold flex items-center justify-center shrink-0 ${TYPE_BADGE[type] ?? TYPE_BADGE.Colorless}`}
        >
          {type[0]}
        </span>
      ))}
    </div>
  )
}

function AttackRow({ attack }) {
  return (
    <div className="rounded-xl bg-stone-50 px-4 py-3 flex flex-col gap-1.5">
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <EnergyCost cost={attack.cost} />
          <span className="font-semibold text-stone-900 text-sm">{attack.name}</span>
        </div>
        {attack.damage != null && (
          <span className="font-bold text-stone-900 text-base tabular-nums shrink-0">
            {attack.damage}
          </span>
        )}
      </div>
      {attack.effect && (
        <p className="text-xs text-stone-500 leading-relaxed">{attack.effect}</p>
      )}
    </div>
  )
}

export default function CardDetail() {
  const { state }   = useLocation()
  const { id }      = useParams()
  const navigate    = useNavigate()
  const { addItem } = useCart()

  const [card, setCard]           = useState(state?.card ?? null)
  const [loading, setLoading]     = useState(!state?.card)
  const [suggested, setSuggested] = useState([])
  const [liked, setLiked]         = useState(false)
  const [added, setAdded]         = useState(false)

  const [originalPrice] = useState(() => +(Math.random() * 280 + 9.9).toFixed(2))
  const [discount]      = useState(() =>
    Math.random() > 0.4 ? 0 : DISCOUNT_OPTIONS[Math.floor(Math.random() * DISCOUNT_OPTIONS.length)]
  )
  const finalPrice = discount > 0
    ? +(originalPrice * (1 - discount / 100)).toFixed(2)
    : originalPrice

  // Fetch card if no router state (direct URL / page refresh)
  useEffect(() => {
    if (card) return
    Card.createCard(0, id)
      .then(setCard)
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [id])

  // Fetch suggested cards from same set
  useEffect(() => {
    if (!card?.set?.id) return
    let cancelled = false

    async function load() {
      try {
        const setData = await tcgdex.fetch('sets', card.set.id)
        if (cancelled) return
        const others = setData.cards.filter(c => c.id !== card.TCGAPIID)
        const sample = others.sort(() => Math.random() - 0.5).slice(0, 8)
        const loaded = await Promise.all(sample.map(c => Card.createCard(0, c.id)))
        if (!cancelled) setSuggested(loaded)
      } catch { /* silent */ }
    }
    load()
    return () => { cancelled = true }
  }, [card])

  const handleAddToCart = () => {
    addItem(card, finalPrice, discount)
    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
  }

  if (loading || !card) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4 text-stone-400">
        <div className="w-10 h-10 rounded-full border-2 border-brand-300 border-t-brand-500 animate-spin" />
        <p className="text-sm">Carregando carta...</p>
      </div>
    )
  }

  const primaryType = card.types?.[0]
  const bgGradient  = TYPE_BG[primaryType] ?? TYPE_BG.Colorless

  return (
    <div className="min-h-screen">

      {/* Voltar */}
      <Link
        to="/"
        className="inline-flex items-center gap-1.5 text-sm text-stone-500 hover:text-brand-500 transition-colors mb-6"
      >
        <FiChevronLeft size={16} />
        Voltar para a loja
      </Link>

      {/* ── Hero: imagem + info ──────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">

        {/* Imagem */}
        <div className="flex flex-col gap-4">
          <div className={`relative rounded-2xl bg-linear-to-br ${bgGradient} flex justify-center items-center py-12 px-8 min-h-96`}>
            {discount > 0 && (
              <div className="absolute top-4 left-4 bg-rose-500 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-md tracking-wide">
                −{discount}% OFF
              </div>
            )}
            <button
              className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center shadow-sm hover:bg-white transition-all"
              onClick={() => setLiked(l => !l)}
            >
              <FiHeart
                size={16}
                className={liked ? 'fill-rose-500 text-rose-500' : 'text-stone-400'}
                style={{ transition: 'fill 0.15s, color 0.15s' }}
              />
            </button>
            <img
              src={card.image}
              alt={card.name}
              className="h-80 w-auto object-contain drop-shadow-2xl"
            />
          </div>

          {/* Info do set */}
          {card.set && (
            <div className="flex items-center gap-3 px-1">
              {card.set.symbol && (
                <img src={`${card.set.symbol}.png`} alt="" className="h-5 opacity-70" onError={e => e.target.style.display = 'none'} />
              )}
              <span className="text-sm text-stone-500 font-medium">{card.set.name}</span>
              {card.illustrator && (
                <span className="text-xs text-stone-400 ml-auto">Illus. {card.illustrator}</span>
              )}
            </div>
          )}
        </div>

        {/* Info */}
        <div className="flex flex-col gap-5">

          {/* Nome + badge */}
          <div className="flex items-start justify-between gap-3">
            <h1 className="text-3xl font-bold text-stone-900 leading-tight">{card.name}</h1>
            <Badge rarity={card.rarity} className="mt-1.5 shrink-0" />
          </div>

          {/* Stats */}
          <div className="flex items-center gap-2 flex-wrap">
            {card.hp != null && (
              <span className="text-sm font-bold text-stone-500 bg-stone-100 px-3 py-1 rounded-full">
                HP {card.hp}
              </span>
            )}
            {card.types?.map(t => <TypeBadge key={t} type={t} />)}
            {card.stage && (
              <span className="text-xs text-stone-500 border border-stone-200 px-2.5 py-1 rounded-full">
                {card.stage}
              </span>
            )}
            {card.evolveFrom && (
              <span className="text-xs text-stone-400">Evolui de {card.evolveFrom}</span>
            )}
          </div>

          {/* Descrição */}
          {card.description && card.description !== 'Sem descrição disponível.' && (
            <p className="text-sm text-stone-500 leading-relaxed border-l-2 border-brand-300 pl-3 italic">
              "{card.description}"
            </p>
          )}

          {/* Ataques */}
          {card.attacks?.length > 0 && (
            <div className="flex flex-col gap-2">
              <h3 className="text-xs font-semibold uppercase tracking-widest text-stone-400">
                Ataques
              </h3>
              {card.attacks.map((attack, i) => (
                <AttackRow key={i} attack={attack} />
              ))}
            </div>
          )}

          {/* Fraquezas + retirada */}
          {(card.weaknesses?.length > 0 || card.retreat != null) && (
            <div className="flex items-center gap-4 flex-wrap">
              {card.weaknesses?.length > 0 && (
                <div className="flex items-center gap-2">
                  <span className="text-xs font-semibold uppercase tracking-widest text-stone-400">
                    Fraqueza
                  </span>
                  {card.weaknesses.map(w => (
                    <span
                      key={w.type}
                      className={`text-xs font-bold px-2.5 py-1 rounded-full ${TYPE_BADGE[w.type] ?? TYPE_BADGE.Colorless}`}
                    >
                      {w.type} {w.value}
                    </span>
                  ))}
                </div>
              )}
              {card.retreat != null && (
                <div className="flex items-center gap-1.5">
                  <span className="text-xs font-semibold uppercase tracking-widest text-stone-400">
                    Retirada
                  </span>
                  <div className="flex gap-0.5">
                    {Array.from({ length: card.retreat }).map((_, i) => (
                      <span key={i} className="w-4 h-4 rounded-full bg-stone-200 inline-block" />
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Preço + CTA */}
          <div className="mt-auto pt-5 border-t border-stone-100 flex flex-col gap-3">
            <div className="flex flex-col gap-0.5">
              {discount > 0 && (
                <span className="text-sm text-stone-400 line-through">
                  R$ {fmt(originalPrice)}
                </span>
              )}
              <div className="flex items-baseline gap-2">
                <span className={`text-4xl font-bold ${discount > 0 ? 'text-rose-600' : 'text-stone-900'}`}>
                  R$ {fmt(finalPrice)}
                </span>
                {discount > 0 && (
                  <span className="text-sm font-bold text-rose-500 bg-rose-50 px-2.5 py-1 rounded-full">
                    −{discount}%
                  </span>
                )}
              </div>
              <span className="text-xs text-stone-400">
                Em até 4x R$ {fmt(finalPrice / 4)} sem juros
              </span>
            </div>

            <Button
              variant="primary"
              size="lg"
              className="w-full justify-center gap-2"
              onClick={handleAddToCart}
            >
              <FiShoppingCart size={18} />
              {added ? 'Adicionado!' : 'Adicionar ao carrinho'}
            </Button>
          </div>

        </div>
      </div>

      {/* ── Cards sugeridos ───────────────────────────── */}
      {suggested.length > 0 && (
        <SectionWrap
          title={`Da coleção: ${card.set?.name ?? 'Relacionados'}`}
          description="Outros cards da mesma coleção"
        >
          <CardGrid
            cards={suggested}
            onCardClick={c => navigate(`/card/${c.TCGAPIID}`, { state: { card: c } })}
          />
        </SectionWrap>
      )}

    </div>
  )
}
