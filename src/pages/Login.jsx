import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabaseClient'

const Login = () => {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const [erro, setErro] = useState('')
  const [loading, setLoading] = useState(false)

  const handleLogin = async (e) => {
    e.preventDefault()
    setLoading(true)
    setErro('')

    const { error } = await supabase.auth.signInWithPassword({ email, password: senha })

    if (error) {
      setErro('Email ou senha incorretos.')
    } else {
      navigate('/')
    }

    setLoading(false)
  }

  return (
    <div className="flex items-center justify-center min-h-screen">
      <form onSubmit={handleLogin} className="flex flex-col gap-4 bg-white p-8 rounded-xl shadow-md w-80">
        <h1 className="text-2xl font-bold text-[#0179be]">Login</h1>

        {erro && <p className="text-red-500 text-sm">{erro}</p>}

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:border-[#0179be]"
          required
        />
        <input
          type="password"
          placeholder="Senha"
          value={senha}
          onChange={e => setSenha(e.target.value)}
          className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:border-[#0179be]"
          required
        />

        <button
          type="submit"
          disabled={loading}
          className="bg-[#0179be] text-white py-2 rounded-lg hover:opacity-90 transition disabled:opacity-50"
        >
          {loading ? 'Entrando...' : 'Entrar'}
        </button>

        <p className="text-sm text-center">
          Não tem conta?{' '}
          <span className="text-[#0179be] cursor-pointer font-bold" onClick={() => navigate('/cadastro')}>
            Cadastre-se
          </span>
        </p>
      </form>
    </div>
  )
}

export default Login