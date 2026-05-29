import { FaMagnifyingGlass, FaHeart, FaCartShopping } from 'react-icons/fa6'
import { FaRegUser } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import vulpix from '../../assets/vulpix.png'
import { useCart } from '../../context/CartContext'

export default function Header() {
    const { count, setIsOpen } = useCart()

    return (
        <nav className="sticky top-0 left-0 right-0 z-50 bg-brand-nav">
            <div className="flex items-center justify-between px-4 sm:px-6 py-2 gap-3">

                <Link to="/" className="shrink-0">
                    <img
                        src={vulpix}
                        alt="Vul-pix"
                        className="w-28 sm:w-40 md:w-48 ml-0 sm:ml-4"
                    />
                </Link>

                <div className="group relative hidden sm:flex items-center flex-1 max-w-xl mx-auto px-4 py-1.5 bg-brand-search border border-brand-search rounded-full shadow-sm hover:shadow-md transition-shadow duration-300">
                    <input
                        className="w-full bg-transparent border-none outline-none text-base"
                        type="search"
                        placeholder="Buscar na loja"
                        aria-label="Search"
                    />
                    <FaMagnifyingGlass className="ml-2.5 text-lg text-brand-600 cursor-pointer" />
                </div>

                <div className="flex items-center gap-3 sm:gap-6 shrink-0 sm:mr-4">
                    <Link to="#" className="sm:hidden">
                        <FaMagnifyingGlass className="text-xl text-brand-600" />
                    </Link>
                    <Link to="#">
                        <FaHeart className="text-xl text-brand-600" />
                    </Link>

                    {/* Carrinho com badge */}
                    <button
                        className="relative cursor-pointer"
                        onClick={() => setIsOpen(true)}
                        aria-label="Abrir carrinho"
                    >
                        <FaCartShopping className="text-xl text-brand-600" />
                        {count > 0 && (
                            <span className="absolute -top-2 -right-2 bg-rose-500 text-white text-[10px] font-bold min-w-4 h-4 px-0.5 rounded-full flex items-center justify-center tabular-nums">
                                {count > 9 ? '9+' : count}
                            </span>
                        )}
                    </button>

                    <Link to="/perfil">
                        <FaRegUser className="text-xl text-brand-600" />
                    </Link>
                </div>

            </div>
        </nav>
    )
}
