import { Link } from 'react-router-dom'
import { FaArrowLeft } from 'react-icons/fa6'
import vulpix from '../../assets/vulpixLogo.svg'

export default function AuthCard({ children }) {
  return (
    <div className="min-h-screen bg-brand-50 flex flex-col items-center justify-center px-4 py-8 gap-4">
      <div className="bg-white rounded-2xl shadow-card-lg w-full max-w-md overflow-hidden">
        <div className="bg-brand-900 px-8 py-6 text-center">
          <Link to="/" className="inline-block">
            <img src={vulpix} alt="Vul-pix" className="h-20 w-auto object-contain mx-auto" />
          </Link>
          <p className="text-brand-300 text-sm mt-1">A sua loja de cartas Pokémon</p>
        </div>
        <div className="px-8 py-8">
          {children}
        </div>
      </div>
      <Link
        to="/"
        className="flex items-center gap-1.5 text-sm text-brand-600 hover:text-brand-500 transition-colors"
      >
        <FaArrowLeft className="text-xs" />
        Voltar para a loja
      </Link>
    </div>
  )
}
