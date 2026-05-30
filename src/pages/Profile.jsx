import { useState } from 'react'
import { Navigate, useNavigate, useLocation } from 'react-router-dom'
import { FiUser, FiHeart, FiShoppingBag, FiPackage } from 'react-icons/fi'
import { useAuth } from '../context/AuthContext'
import { useDb } from '../hooks/useDb'
import CardGrid from '../components/CardGrid'

const TABS = [
  { id: 'info',      label: 'Meus Dados',    icon: FiUser },
  { id: 'favorites', label: 'Favoritos',      icon: FiHeart },
  { id: 'orders',    label: 'Minhas Compras', icon: FiShoppingBag },
]

const METHOD_LABELS = {
  pix:    'Pix',
  credit: 'Cartão de Crédito',
  boleto: 'Boleto',
}

function fmt(v) {
  return Number(v).toLocaleString('pt-BR', { minimumFractionDigits: 2 })
}

function fmtDate(iso) {
  return new Date(iso).toLocaleDateString('pt-BR', {
    day: '2-digit', month: '2-digit', year: 'numeric',
    hour: '2-digit', minute: '2-digit',
  })
}

function InfoTab({ user }) {
  return (
    <div className="max-w-md">
      <h2 className="text-lg font-bold text-stone-800 mb-6">Informações da conta</h2>
      <div className="flex flex-col gap-4">
        <div className="bg-stone-50 rounded-xl px-5 py-4">
          <p className="text-xs font-semibold uppercase tracking-widest text-stone-400 mb-1">Nome</p>
          <p className="text-stone-900 font-medium">{user.name}</p>
        </div>
        <div className="bg-stone-50 rounded-xl px-5 py-4">
          <p className="text-xs font-semibold uppercase tracking-widest text-stone-400 mb-1">E-mail</p>
          <p className="text-stone-900 font-medium">{user.email}</p>
        </div>
      </div>
    </div>
  )
}

function FavoritesTab({ user, db, navigate }) {
  const favs = db.getAll('favorites').filter(f => f.userId === user.id)
  const cards = favs.map(f => f.card).filter(Boolean)

  if (cards.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 gap-3 text-stone-300">
        <FiHeart size={48} strokeWidth={1} />
        <p className="text-stone-400 font-medium text-sm">Nenhuma carta favoritada ainda</p>
        <p className="text-xs text-stone-300">Explore a loja e favorite suas cartas preferidas</p>
      </div>
    )
  }

  return (
    <div>
      <h2 className="text-lg font-bold text-stone-800 mb-4">Favoritos ({cards.length})</h2>
      <CardGrid
        cards={cards}
        onCardClick={card => navigate(`/card/${card.TCGAPIID}`, { state: { card } })}
      />
    </div>
  )
}

function OrdersTab({ user, db }) {
  const orders = db.getAll('orders')
    .filter(o => o.userId === user.id)
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))

  if (orders.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 gap-3 text-stone-300">
        <FiPackage size={48} strokeWidth={1} />
        <p className="text-stone-400 font-medium text-sm">Nenhuma compra realizada ainda</p>
        <p className="text-xs text-stone-300">Finalize uma compra para ver o histórico aqui</p>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-lg font-bold text-stone-800">Minhas Compras ({orders.length})</h2>
      {orders.map(order => (
        <div key={order.id} className="bg-white border border-stone-100 rounded-2xl overflow-hidden shadow-sm">
          <div className="flex items-center justify-between px-5 py-3 bg-stone-50 border-b border-stone-100">
            <div>
              <span className="text-xs font-semibold uppercase tracking-widest text-stone-400">
                {fmtDate(order.createdAt)}
              </span>
              <span className="ml-3 text-xs font-bold text-brand-600 bg-brand-50 px-2 py-0.5 rounded-full">
                {METHOD_LABELS[order.paymentMethod] ?? order.paymentMethod}
              </span>
            </div>
            <span className="text-sm font-bold text-stone-900">R$ {fmt(order.total)}</span>
          </div>

          <div className="px-5 py-3 flex flex-col gap-2">
            {order.items.map((item, i) => (
              <div key={i} className="flex items-center gap-3">
                {item.card?.image && (
                  <img
                    src={item.card.image}
                    alt={item.card.name}
                    className="w-8 h-11 object-contain rounded"
                    onError={e => { e.target.style.display = 'none' }}
                  />
                )}
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-stone-800 truncate">{item.card?.name}</p>
                  <p className="text-xs text-stone-400">
                    Qtd: {item.quantity} · R$ {fmt(item.price * item.quantity)}
                    {item.discount > 0 && <span className="ml-1 text-rose-500">−{item.discount}%</span>}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="px-5 py-2 bg-green-50 border-t border-green-100">
            <span className="text-xs font-semibold text-green-700">Pedido processado com sucesso</span>
          </div>
        </div>
      ))}
    </div>
  )
}

export default function Profile() {
  const { user } = useAuth()
  const db = useDb()
  const navigate = useNavigate()
  const location = useLocation()

  const [activeTab, setActiveTab] = useState(location.state?.tab ?? 'info')

  if (!user) return <Navigate to="/login" replace />

  return (
    <div className="max-w-5xl mx-auto">
      {/* Header do perfil */}
      <div className="flex items-center gap-4 mb-8">
        <div className="w-16 h-16 rounded-full bg-brand-100 flex items-center justify-center shrink-0">
          <FiUser size={28} className="text-brand-500" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-stone-900">{user.name}</h1>
          <p className="text-sm text-stone-400">{user.email}</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 border-b border-stone-200 mb-8">
        {TABS.map(tab => {
          const Icon = tab.icon
          const active = activeTab === tab.id
          return (
            <button
              key={tab.id}
              className={`flex items-center gap-2 px-4 py-2.5 text-sm font-semibold transition-colors border-b-2 -mb-px ${
                active
                  ? 'border-brand-500 text-brand-600'
                  : 'border-transparent text-stone-500 hover:text-stone-700'
              }`}
              onClick={() => setActiveTab(tab.id)}
            >
              <Icon size={15} />
              {tab.label}
            </button>
          )
        })}
      </div>

      {/* Conteúdo */}
      {activeTab === 'info'      && <InfoTab user={user} />}
      {activeTab === 'favorites' && <FavoritesTab user={user} db={db} navigate={navigate} />}
      {activeTab === 'orders'    && <OrdersTab user={user} db={db} />}
    </div>
  )
}
