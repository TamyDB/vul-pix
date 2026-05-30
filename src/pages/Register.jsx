import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Input from '../components/ui/Input'
import Button from '../components/ui/Button'
import { useAuth } from '../context/AuthContext'
import AuthCard from '../components/layout/AuthCard'

function validate(form) {
  const errs = {}
  if (!form.name || form.name.trim().length < 2)
    errs.name = 'Nome deve ter pelo menos 2 caracteres'
  if (!form.email)
    errs.email = 'E-mail é obrigatório'
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
    errs.email = 'E-mail inválido'
  if (!form.password || form.password.length < 6)
    errs.password = 'Senha deve ter pelo menos 6 caracteres'
  if (form.password !== form.confirmPassword)
    errs.confirmPassword = 'As senhas não coincidem'
  return errs
}

export default function Register() {
  const { register } = useAuth()
  const navigate = useNavigate()

  const [form, setForm] = useState({ name: '', email: '', password: '', confirmPassword: '' })
  const [errors, setErrors] = useState({})
  const [globalError, setGlobalError] = useState('')

  const set = field => e => setForm(prev => ({ ...prev, [field]: e.target.value }))

  function handleSubmit(e) {
    e.preventDefault()
    setGlobalError('')
    const errs = validate(form)
    if (Object.keys(errs).length) { setErrors(errs); return }
    setErrors({})

    const result = register(form.name.trim(), form.email, form.password)
    if (!result.success) { setGlobalError(result.message); return }
    navigate('/')
  }

  return (
    <AuthCard>
      <h1 className="text-2xl font-bold text-gray-900 mb-1">Crie sua conta</h1>
      <p className="text-gray-500 text-sm mb-6">Cadastre-se e comece a colecionar</p>

      {globalError && (
        <div className="bg-red-50 border border-red-200 text-red-600 text-sm rounded-lg px-4 py-3 mb-5">
          {globalError}
        </div>
      )}

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Nome</label>
          <Input
            placeholder="Seu nome completo"
            value={form.name}
            onChange={set('name')}
            error={errors.name}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">E-mail</label>
          <Input
            type="email"
            placeholder="seu@email.com"
            value={form.email}
            onChange={set('email')}
            error={errors.email}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Senha</label>
          <Input
            type="password"
            placeholder="Mínimo 6 caracteres"
            value={form.password}
            onChange={set('password')}
            error={errors.password}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Confirmar senha</label>
          <Input
            type="password"
            placeholder="••••••••"
            value={form.confirmPassword}
            onChange={set('confirmPassword')}
            error={errors.confirmPassword}
          />
        </div>

        <Button type="submit" variant="primary" size="md" className="w-full mt-2">
          Criar conta
        </Button>
      </form>

      <p className="text-center text-sm text-gray-500 mt-6">
        Já tem uma conta?{' '}
        <Link to="/login" className="text-brand-500 font-semibold hover:underline">
          Entrar
        </Link>
      </p>
    </AuthCard>
  )
}
