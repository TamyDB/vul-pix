import { useState, useRef } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import { FiCreditCard, FiFileText, FiZap, FiCheck, FiCopy, FiChevronRight, FiChevronLeft } from 'react-icons/fi'
import Barcode from 'react-barcode'
import { useAuth } from '../context/AuthContext'
import { useCart } from '../context/CartContext'
import { useDb } from '../hooks/useDb'
import Input from '../components/ui/Input'
import Button from '../components/ui/Button'

const METHODS = [
  {
    id: 'pix',
    label: 'Pix',
    icon: FiZap,
    desc: 'Pagamento instantâneo • 5% de desconto',
    color: 'text-green-600',
    bg: 'bg-green-50',
    border: 'border-green-500',
  },
  {
    id: 'credit',
    label: 'Cartão de Crédito',
    icon: FiCreditCard,
    desc: 'Em até 4x sem juros',
    color: 'text-brand-600',
    bg: 'bg-brand-50',
    border: 'border-brand-500',
  },
  {
    id: 'boleto',
    label: 'Boleto Bancário',
    icon: FiFileText,
    desc: 'Vence em 3 dias úteis',
    color: 'text-stone-600',
    bg: 'bg-stone-50',
    border: 'border-stone-400',
  },
]

const PIX_CODE = `00020126580014BR.GOV.BCB.PIX0136vulpix@loja.com.br52040000530398654051.005802BR5912Vul-Pix Loja6009SAO PAULO62070503***63041D3D`
const BOLETO_NUM = '03399.31904 41000.000003 02085.301020 9 10700000001000'
const BOLETO_BARCODE_VAL = '03399319044100000000302085301020910700000001000'

function fmt(v) {
  return Number(Math.round(v * 100) / 100).toLocaleString('pt-BR', { 
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  })
}

function maskCard(v) {
  return v.replace(/\D/g, '').replace(/(.{4})/g, '$1 ').trim().slice(0, 19)
}
function maskExpiry(v) {
  return v.replace(/\D/g, '').replace(/^(\d{2})(\d)/, '$1/$2').slice(0, 5)
}

// ─── Order Summary ───────────────────────────────────────────────────────────
function OrderSummary({ items, total, method }) {
  const discountedTotal = method === 'pix' ? total * 0.95 : total
  return (
    <div className="bg-white border border-stone-100 rounded-2xl overflow-hidden shadow-sm h-fit">
      <div className="px-5 py-4 border-b border-stone-100 bg-stone-50">
        <h3 className="font-semibold text-stone-700 text-sm">Resumo do pedido</h3>
      </div>
      <div className="divide-y divide-stone-50">
        {items.map(item => (
          <div key={item.card.TCGAPIID} className="flex items-center gap-3 px-4 py-3">
            <div className="w-9 h-12 shrink-0 rounded bg-stone-50 flex items-center justify-center overflow-hidden">
              <img
                src={item.card.image}
                alt={item.card.name}
                className="h-full w-auto object-contain"
                onError={e => { e.target.style.display = 'none' }}
              />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-stone-800 truncate">{item.card.name}</p>
              <p className="text-xs text-stone-400">Qtd: {item.quantity}</p>
            </div>
            <p className="text-sm font-bold text-stone-900 shrink-0">
              R$ {fmt(item.price * item.quantity)}
            </p>
          </div>
        ))}
      </div>
      <div className="px-5 py-4 border-t border-stone-100 flex flex-col gap-1">
        {method === 'pix' && (
          <div className="flex justify-between text-sm">
            <span className="text-green-600 font-medium">Desconto Pix (5%)</span>
            <span className="text-green-600 font-bold">− R$ {fmt(total * 0.05)}</span>
          </div>
        )}
        <div className="flex justify-between items-baseline">
          <span className="text-sm text-stone-500">Total</span>
          <span className="text-xl font-bold text-stone-900">R$ {fmt(discountedTotal)}</span>
        </div>
        {method === 'credit' && (
          <p className="text-xs text-stone-400">Em até 4x de R$ {fmt(total / 4)} sem juros</p>
        )}
      </div>
    </div>
  )
}

// ─── Step 1: Method Selection ─────────────────────────────────────────────────
function MethodStep({ method, setMethod, onNext }) {
  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-base font-semibold text-stone-700">Escolha a forma de pagamento</h2>
      <div className="flex flex-col gap-3">
        {METHODS.map(m => {
          const Icon = m.icon
          const active = method === m.id
          return (
            <button
              key={m.id}
              className={`flex items-center gap-4 px-5 py-4 rounded-2xl border-2 text-left transition-all ${
                active ? `${m.border} ${m.bg}` : 'border-stone-200 bg-white hover:border-stone-300'
              }`}
              onClick={() => setMethod(m.id)}
            >
              <div className={`w-11 h-11 rounded-full flex items-center justify-center shrink-0 ${
                active ? `${m.bg} ${m.color}` : 'bg-stone-100 text-stone-400'
              }`}>
                <Icon size={20} />
              </div>
              <div className="flex-1">
                <p className={`font-semibold text-sm ${active ? m.color : 'text-stone-700'}`}>{m.label}</p>
                <p className="text-xs text-stone-400 mt-0.5">{m.desc}</p>
              </div>
              <div className={`w-5 h-5 rounded-full border-2 shrink-0 flex items-center justify-center transition-colors ${
                active ? m.border : 'border-stone-300'
              }`}>
                {active && <div className={`w-2.5 h-2.5 rounded-full ${active ? m.bg.replace('bg-', 'bg-').replace('-50', '-500') : ''} ${m.color.replace('text-', 'bg-')}`} />}
              </div>
            </button>
          )
        })}
      </div>

      <Button
        variant="primary"
        size="lg"
        className="w-full justify-center gap-2 mt-2"
        disabled={!method}
        onClick={onNext}
      >
        Continuar para pagamento
        <FiChevronRight size={18} />
      </Button>
    </div>
  )
}

// ─── Pix Payment ─────────────────────────────────────────────────────────────
function PixPayment({ total }) {
  const [copied, setCopied] = useState(false)
  const discounted = total * 0.95
  const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=220x220&data=${encodeURIComponent(PIX_CODE)}&bgcolor=ffffff&color=000000&margin=10`

  function handleCopy() {
    navigator.clipboard.writeText(PIX_CODE).catch(() => {})
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="flex flex-col items-center gap-5">
      <div className="bg-white rounded-2xl border border-stone-100 shadow-sm p-5 flex flex-col items-center gap-4 w-full">
        <p className="text-sm font-medium text-stone-600">Escaneie o QR Code com seu banco</p>
        <img
          src={qrUrl}
          alt="QR Code Pix"
          className="w-52 h-52 rounded-xl"
        />
        <div className="text-center">
          <p className="text-2xl font-bold text-stone-900">R$ {fmt(discounted)}</p>
          <p className="text-xs text-green-600 font-medium">5% de desconto aplicado</p>
        </div>
      </div>

      <div className="w-full">
        <p className="text-xs font-semibold text-stone-400 mb-2 uppercase tracking-widest">Pix Copia e Cola</p>
        <div className="flex gap-2 items-stretch">
          <div className="flex-1 bg-stone-50 rounded-xl px-4 py-3 text-xs font-mono text-stone-500 break-all border border-stone-100 leading-relaxed">
            {PIX_CODE}
          </div>
          <button
            className={`shrink-0 px-4 rounded-xl border text-sm font-semibold flex items-center gap-2 transition-colors ${
              copied
                ? 'bg-green-50 border-green-200 text-green-600'
                : 'bg-white border-stone-200 text-stone-600 hover:bg-stone-50'
            }`}
            onClick={handleCopy}
          >
            {copied ? <FiCheck size={15} /> : <FiCopy size={15} />}
            {copied ? 'Copiado!' : 'Copiar'}
          </button>
        </div>
      </div>
    </div>
  )
}

// ─── Boleto Payment ───────────────────────────────────────────────────────────
function BoletoPayment() {
  const [copied, setCopied] = useState(false)

  function handleCopy() {
    navigator.clipboard.writeText(BOLETO_NUM).catch(() => {})
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="flex flex-col gap-5">
      <div className="bg-white rounded-2xl border border-stone-100 shadow-sm p-5 flex flex-col items-center gap-4">
        <p className="text-sm font-medium text-stone-600">Código de barras</p>
        <div className="overflow-x-auto w-full flex justify-center">
          <Barcode
            value={BOLETO_BARCODE_VAL}
            format="CODE128"
            width={1.4}
            height={70}
            fontSize={11}
            displayValue={false}
            background="#ffffff"
            lineColor="#1c1917"
          />
        </div>
      </div>

      <div>
        <p className="text-xs font-semibold text-stone-400 mb-2 uppercase tracking-widest">Linha digitável</p>
        <div className="flex gap-2 items-stretch">
          <div className="flex-1 bg-stone-50 rounded-xl px-4 py-3 text-sm font-mono text-stone-700 border border-stone-100 leading-relaxed">
            {BOLETO_NUM}
          </div>
          <button
            className={`shrink-0 px-4 rounded-xl border text-sm font-semibold flex items-center gap-2 transition-colors ${
              copied
                ? 'bg-green-50 border-green-200 text-green-600'
                : 'bg-white border-stone-200 text-stone-600 hover:bg-stone-50'
            }`}
            onClick={handleCopy}
          >
            {copied ? <FiCheck size={15} /> : <FiCopy size={15} />}
            {copied ? 'Copiado!' : 'Copiar'}
          </button>
        </div>
      </div>

      <div className="bg-amber-50 border border-amber-100 rounded-xl px-4 py-3 text-sm text-amber-700 flex flex-col gap-1">
        <p className="font-semibold">Atenção</p>
        <p className="text-xs">O boleto vence em <strong>3 dias úteis</strong>. Pague em qualquer banco, lotérica ou pelo seu aplicativo bancário.</p>
      </div>
    </div>
  )
}

// ─── Credit Card Payment ──────────────────────────────────────────────────────
function CreditPayment({ form, setForm, errors }) {
  const set = field => e => {
    let v = e.target.value
    if (field === 'number') v = maskCard(v)
    if (field === 'expiry') v = maskExpiry(v)
    if (field === 'cvv') v = v.replace(/\D/g, '').slice(0, 4)
    if (field === 'name') v = v.toUpperCase()
    setForm(prev => ({ ...prev, [field]: v }))
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="bg-gradient-to-br from-brand-700 to-brand-900 rounded-2xl p-5 text-white mb-2">
        <p className="text-xs opacity-60 mb-4 tracking-widest uppercase">Cartão de Crédito</p>
        <p className="text-lg font-mono tracking-widest mb-4">
          {form.number || '•••• •••• •••• ••••'}
        </p>
        <div className="flex justify-between items-end">
          <div>
            <p className="text-[10px] opacity-50 uppercase mb-0.5">Nome</p>
            <p className="text-sm font-medium uppercase truncate max-w-40">
              {form.name || 'NOME NO CARTÃO'}
            </p>
          </div>
          <div className="text-right">
            <p className="text-[10px] opacity-50 uppercase mb-0.5">Validade</p>
            <p className="text-sm font-medium">{form.expiry || 'MM/AA'}</p>
          </div>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Número do cartão</label>
        <Input placeholder="0000 0000 0000 0000" value={form.number} onChange={set('number')} error={errors.number} />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Nome no cartão</label>
        <Input placeholder="COMO ESTÁ NO CARTÃO" value={form.name} onChange={set('name')} error={errors.name} />
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Validade</label>
          <Input placeholder="MM/AA" value={form.expiry} onChange={set('expiry')} error={errors.expiry} />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">CVV</label>
          <Input placeholder="123" value={form.cvv} onChange={set('cvv')} error={errors.cvv} />
        </div>
      </div>
    </div>
  )
}

function validateCredit(form) {
  const errs = {}
  if (!form.number || form.number.replace(/\s/g, '').length < 16) errs.number = 'Número inválido'
  if (!form.name || form.name.trim().length < 3) errs.name = 'Nome obrigatório'
  if (!form.expiry || form.expiry.length < 5) errs.expiry = 'Validade inválida'
  if (!form.cvv || form.cvv.length < 3) errs.cvv = 'CVV inválido'
  return errs
}

// ─── Step 2: Payment Details ──────────────────────────────────────────────────
function PaymentStep({ method, total, creditForm, setCreditForm, creditErrors, setCreditErrors, onBack, onConfirm }) {
  const methodLabel = METHODS.find(m => m.id === method)?.label

  function handleFinish() {
    if (method === 'credit') {
      const errs = validateCredit(creditForm)
      if (Object.keys(errs).length) { setCreditErrors(errs); return }
      setCreditErrors({})
    }
    onConfirm()
  }

  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-center gap-2">
        <button
          className="w-8 h-8 rounded-full bg-stone-100 hover:bg-stone-200 flex items-center justify-center transition-colors"
          onClick={onBack}
        >
          <FiChevronLeft size={16} />
        </button>
        <h2 className="text-base font-semibold text-stone-700">{methodLabel}</h2>
      </div>

      {method === 'pix'    && <PixPayment total={total} />}
      {method === 'boleto' && <BoletoPayment />}
      {method === 'credit' && (
        <CreditPayment
          form={creditForm}
          setForm={setCreditForm}
          errors={creditErrors}
        />
      )}

      <Button variant="primary" size="lg" className="w-full justify-center gap-2" onClick={handleFinish}>
        <FiCheck size={18} />
        Finalizar Compra
      </Button>
    </div>
  )
}

// ─── Stepper ──────────────────────────────────────────────────────────────────
function Stepper({ step }) {
  const steps = ['Pagamento', 'Confirmação']
  return (
    <div className="flex items-center gap-2 mb-8">
      {steps.map((label, i) => {
        const num = i + 1
        const done = step > num
        const active = step === num
        return (
          <div key={label} className="flex items-center gap-2">
            <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-colors ${
              done    ? 'bg-green-500 text-white' :
              active  ? 'bg-brand-500 text-white' :
                        'bg-stone-200 text-stone-400'
            }`}>
              {done ? <FiCheck size={12} /> : num}
            </div>
            <span className={`text-sm font-medium hidden sm:block ${active ? 'text-stone-800' : 'text-stone-400'}`}>
              {label}
            </span>
            {i < steps.length - 1 && (
              <div className={`h-px w-8 sm:w-12 mx-1 ${done ? 'bg-green-400' : 'bg-stone-200'}`} />
            )}
          </div>
        )
      })}
    </div>
  )
}

// ─── Main ─────────────────────────────────────────────────────────────────────
export default function Checkout() {
  const { user } = useAuth()
  const { items, total, clearCart, setIsOpen } = useCart()
  const db = useDb()
  const navigate = useNavigate()

  const [step, setStep] = useState(1)
  const [method, setMethod] = useState(null)
  const [creditForm, setCreditForm] = useState({ number: '', name: '', expiry: '', cvv: '' })
  const [creditErrors, setCreditErrors] = useState({})
  const [done, setDone] = useState(false)

  if (!user) return <Navigate to="/login" replace />
  if (items.length === 0 && !done) return <Navigate to="/" replace />

  function handleConfirm() {
    const discountedTotal = method === 'pix' ? total * 0.95 : total
    db.save('orders', {
      userId: user.id,
      items: items.map(({ card, price, discount, quantity }) => ({ card, price, discount, quantity })),
      total: discountedTotal,
      paymentMethod: method,
      createdAt: new Date().toISOString(),
    })
    clearCart()
    setIsOpen(false)
    setDone(true)
  }

  if (done) {
    return (
      <div className="max-w-md mx-auto flex flex-col items-center text-center gap-6 py-20">
        <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center">
          <FiCheck size={36} className="text-green-500" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-stone-900 mb-2">Pedido confirmado!</h2>
          <p className="text-stone-500 text-sm">
            Seu pagamento foi processado com sucesso. Obrigado pela compra!
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3 w-full">
          <Button
            variant="primary"
            size="md"
            className="flex-1 justify-center"
            onClick={() => navigate('/profile', { state: { tab: 'orders' } })}
          >
            Ver meus pedidos
          </Button>
          <Button
            variant="ghost"
            size="md"
            className="flex-1 justify-center"
            onClick={() => navigate('/')}
          >
            Continuar comprando
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold text-stone-900 mb-6">Finalizar Compra</h1>
      <Stepper step={step} />

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-8 items-start">
        {/* Main column */}
        <div>
          {step === 1 && (
            <MethodStep
              method={method}
              setMethod={setMethod}
              onNext={() => setStep(2)}
            />
          )}
          {step === 2 && (
            <PaymentStep
              method={method}
              total={total}
              creditForm={creditForm}
              setCreditForm={setCreditForm}
              creditErrors={creditErrors}
              setCreditErrors={setCreditErrors}
              onBack={() => setStep(1)}
              onConfirm={handleConfirm}
            />
          )}
        </div>

        {/* Order summary */}
        <OrderSummary items={items} total={total} method={method} />
      </div>
    </div>
  )
}
