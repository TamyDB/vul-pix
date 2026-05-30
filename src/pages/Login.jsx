import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Input from '../components/ui/Input'
import Button from '../components/ui/Button'
import { useAuth } from '../context/AuthContext'
import AuthCard from '../components/layout/AuthCard'

function validate(email, password) {
  const errs = {}
  if (!email) errs.email = 'E-mail é obrigatório'
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errs.email = 'E-mail inválido'
  if (!password) errs.password = 'Senha é obrigatória'
  return errs
}

export default function Login() {
  const { login } = useAuth()
  const navigate = useNavigate()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errors, setErrors] = useState({})
  const [globalError, setGlobalError] = useState('')

  function handleSubmit(e) {
    e.preventDefault()
    setGlobalError('')
    const errs = validate(email, password)
    if (Object.keys(errs).length) { setErrors(errs); return }
    setErrors({})

    const result = login(email, password)
    if (!result.success) { setGlobalError(result.message); return }
    navigate('/')
  }

  return (
    <AuthCard>
      <h1 className="text-2xl font-bold text-gray-900 mb-1">Bem-vindo de volta!</h1>
      <p className="text-gray-500 text-sm mb-6">Entre na sua conta para continuar</p>

      {globalError && (
        <div className="bg-red-50 border border-red-200 text-red-600 text-sm rounded-lg px-4 py-3 mb-5">
          {globalError}
        </div>
      )}

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">E-mail</label>
          <Input
            type="email"
            placeholder="seu@email.com"
            value={email}
            onChange={e => setEmail(e.target.value)}
            error={errors.email}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Senha</label>
          <Input
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={e => setPassword(e.target.value)}
            error={errors.password}
          />
        </div>

        <Button type="submit" variant="primary" size="md" className="w-full mt-2">
          Entrar
        </Button>
      </form>

      <p className="text-center text-sm text-gray-500 mt-6">
        Não tem uma conta?{' '}
        <Link to="/register" className="text-brand-500 font-semibold hover:underline">
          Cadastre-se
        </Link>
      </p>
    </AuthCard>
  )
}
