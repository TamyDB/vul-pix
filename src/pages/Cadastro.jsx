import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabaseClient'

const Cadastro = () => {
  const navigate = useNavigate()
  const [nome, setNome] = useState('')
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const [erro, setErro] = useState('')
  const [loading, setLoading] = useState(false)

  const handleCadastro = async (e) => {
    e.preventDefault()
    setLoading(true)
    setErro('')

    const { error } = await supabase.auth.signUp({
      email,
      password: senha,
      options: {
        data: { nome_completo: nome }
      }
    })

    if (error) {
      setErro(error.message)
    } else {
      alert('Cadastro feito! Verifique seu e-mail.')
      navigate('/')
    }

    setLoading(false)
  }

  return (
    <div className="flex items-center justify-center min-h-screen">
      <form onSubmit={handleCadastro} className="flex flex-col gap-4 bg-white p-8 rounded-xl shadow-md w-80">
        <h1 className="text-2xl font-bold text-[#0179be]">Cadastro</h1>

        {erro && <p className="text-red-500 text-sm">{erro}</p>}

        <input
          type="text"
          placeholder="Nome Completo"
          value={nome}
          onChange={e => setNome(e.target.value)}
          className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:border-[#0179be]"
          required
        />
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
          {loading ? 'Cadastrando...' : 'Cadastre-se'}
        </button>

        <p className="text-sm text-center">
          Já tem conta?{' '}
          <span className="text-[#0179be] cursor-pointer font-bold" onClick={() => navigate('/login')}>
            Entrar
          </span>
        </p>
      </form>
    </div>
  )
}

export default Cadastro