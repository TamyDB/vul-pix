import { FiX, FiShoppingCart, FiTrash2, FiMinus, FiPlus } from 'react-icons/fi'
import { useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import Button from './ui/Button'

function fmt(v) {
  return v.toLocaleString('pt-BR', { minimumFractionDigits: 2 })
}

function CartItem({ item }) {
  const { removeItem, updateQty } = useCart()
  const { card, price, discount, quantity } = item

  return (
    <div className="flex gap-3 py-4 border-b border-stone-100 last:border-0">
      <div className="w-14 h-20 shrink-0 rounded-lg bg-stone-50 flex items-center justify-center overflow-hidden">
        <img src={card.image} alt={card.name} className="h-full w-auto object-contain" />
      </div>

      <div className="flex-1 min-w-0 flex flex-col justify-between">
        <div>
          <p className="font-semibold text-sm text-stone-900 leading-tight line-clamp-2">{card.name}</p>
          <p className="text-xs text-stone-400 mt-0.5">{card.rarity}</p>
        </div>
        <div className="flex items-center gap-2 mt-2">
          <button
            className="w-6 h-6 rounded-full bg-stone-100 hover:bg-stone-200 flex items-center justify-center transition-colors"
            onClick={() => updateQty(card.TCGAPIID, quantity - 1)}
          >
            <FiMinus size={10} />
          </button>
          <span className="text-sm font-semibold w-4 text-center tabular-nums">{quantity}</span>
          <button
            className="w-6 h-6 rounded-full bg-stone-100 hover:bg-stone-200 flex items-center justify-center transition-colors"
            onClick={() => updateQty(card.TCGAPIID, quantity + 1)}
          >
            <FiPlus size={10} />
          </button>
        </div>
      </div>

      <div className="shrink-0 flex flex-col items-end justify-between">
        <button
          onClick={() => removeItem(card.TCGAPIID)}
          className="text-stone-300 hover:text-rose-400 transition-colors"
        >
          <FiTrash2 size={14} />
        </button>
        <div className="flex flex-col items-end gap-0.5">
          {discount > 0 && (
            <span className="text-[10px] font-bold text-rose-500 bg-rose-50 px-1.5 py-0.5 rounded-full">
              −{discount}%
            </span>
          )}
          <span className="text-sm font-bold text-stone-900">
            R$ {fmt(price * quantity)}
          </span>
        </div>
      </div>
    </div>
  )
}

export default function CartDrawer() {
  const { items, isOpen, setIsOpen, total, count } = useCart()
  const navigate = useNavigate()

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 bg-black/40 backdrop-blur-sm z-40 transition-opacity duration-300 ${
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setIsOpen(false)}
      />

      {/* Drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-full sm:max-w-sm bg-white z-50 flex flex-col shadow-2xl transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Cabeçalho */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-stone-100">
          <div className="flex items-center gap-2.5">
            <FiShoppingCart className="text-brand-500" size={20} />
            <h2 className="font-bold text-stone-900 text-lg">Carrinho</h2>
            {count > 0 && (
              <span className="bg-brand-500 text-white text-[11px] font-bold w-5 h-5 rounded-full flex items-center justify-center">
                {count > 9 ? '9+' : count}
              </span>
            )}
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="w-8 h-8 rounded-full hover:bg-stone-100 flex items-center justify-center transition-colors"
          >
            <FiX size={18} />
          </button>
        </div>

        {/* Itens */}
        <div className="flex-1 overflow-y-auto px-5">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center gap-3 text-stone-300 py-16">
              <FiShoppingCart size={48} strokeWidth={1} />
              <p className="text-sm font-medium text-stone-400">Seu carrinho está vazio</p>
              <p className="text-xs text-stone-300">Adicione cartas para continuar</p>
            </div>
          ) : (
            <div>
              {items.map(item => (
                <CartItem key={item.card.TCGAPIID} item={item} />
              ))}
            </div>
          )}
        </div>

        {/* Rodapé */}
        {items.length > 0 && (
          <div className="border-t border-stone-100 px-5 py-5 flex flex-col gap-3 bg-white">
            <div className="flex justify-between items-baseline">
              <span className="text-sm text-stone-500">Total</span>
              <span className="text-2xl font-bold text-stone-900">R$ {fmt(total)}</span>
            </div>
            <p className="text-xs text-stone-400 -mt-1">
              Em até 4x R$ {fmt(total / 4)} sem juros
            </p>
            <Button
              variant="primary"
              size="lg"
              className="w-full justify-center"
              onClick={() => { navigate('/checkout'); setIsOpen(false) }}
            >
              Finalizar compra
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="w-full justify-center text-stone-500"
              onClick={() => setIsOpen(false)}
            >
              Continuar comprando
            </Button>
          </div>
        )}
      </div>
    </>
  )
}
