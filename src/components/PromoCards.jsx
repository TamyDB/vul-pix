import { useMemo } from 'react'
import { FaFire, FaStar, FaGift } from 'react-icons/fa6'
import promo1 from '../assets/promo-1.jpg'
import promo2 from '../assets/promo-2.jpg'
import promo3 from '../assets/promo-3.jpg'

export default function PromoCards() {
  const promos = useMemo(() => [
    {
      tag:      'Hot Deal',
      tagClass: 'bg-rose-100 text-rose-600',
      title:    'Boosters com 30% OFF',
      desc:     'Em packs selecionados das coleções mais recentes.',
      image:    promo1,
      bgClass:  'from-rose-100 to-orange-50',
      Icon:     FaFire,
    },
    {
      tag:      'Top Vendas',
      tagClass: 'bg-amber-100 text-amber-600',
      title:    'Holos a partir de R$ 19,90',
      desc:     'Cartas raras para todos os bolsos. Estoque limitado.',
      image:    promo2,
      bgClass:  'from-amber-100 to-yellow-50',
      Icon:     FaStar,
    },
    {
      tag:      'Combo',
      tagClass: 'bg-brand-50 text-brand-500',
      title:    'Elite Trainer Box + brindes',
      desc:     'Leve um ETB e ganhe sleeves + deck box exclusivos.',
      image:    promo3,
      bgClass:  'from-brand-50 to-brand-100',
      Icon:     FaGift,
    },
  ], [])

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-start">
      {promos.map(({ tag, tagClass, title, desc, image, bgClass, Icon }) => (
        <div
          key={tag}
          className="group bg-white rounded-2xl overflow-hidden shadow-card hover:shadow-card-lg transition-shadow duration-300 cursor-pointer"
        >
          {/* Área da imagem */}
          <div className={`relative aspect-video bg-linear-to-br ${bgClass} overflow-hidden`}>
            <img
              src={image}
              alt={title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              onError={e => { e.currentTarget.style.display = 'none' }}
            />
          </div>

          {/* Conteúdo */}
          <div className="p-4 flex flex-col gap-1.5">
            <span className={`self-start inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full ${tagClass}`}>
              <Icon size={11} />
              {tag}
            </span>
            <h3 className="font-bold text-stone-900 text-base leading-snug mt-0.5">
              {title}
            </h3>
            <p className="text-sm text-stone-400 leading-relaxed">
              {desc}
            </p>
          </div>
        </div>
      ))}
    </div>
  )
}
