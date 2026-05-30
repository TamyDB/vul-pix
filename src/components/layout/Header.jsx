import { useState, useEffect, useRef } from 'react'
import { FaMagnifyingGlass, FaHeart, FaCartShopping } from 'react-icons/fa6'
import { FaRegUser } from 'react-icons/fa'
import { FiLogOut, FiUser, FiX } from 'react-icons/fi'
import { Link, useNavigate } from 'react-router-dom'
import vulpix from '../../assets/vulpix.png'
import { useCart } from '../../context/CartContext'
import { useAuth } from '../../context/AuthContext'

function useDebounce(value, delay) {
    const [debounced, setDebounced] = useState(value)
    useEffect(() => {
        const t = setTimeout(() => setDebounced(value), delay)
        return () => clearTimeout(t)
    }, [value, delay])
    return debounced
}

function SearchBar({ className = '' }) {
    const navigate = useNavigate()
    const [query, setQuery] = useState('')
    const [results, setResults] = useState([])
    const [loading, setLoading] = useState(false)
    const [open, setOpen] = useState(false)
    const wrapperRef = useRef(null)
    const debouncedQuery = useDebounce(query, 400)

    useEffect(() => {
        if (!debouncedQuery.trim()) { setResults([]); setOpen(false); return }
        setLoading(true)
        fetch(`https://api.tcgdex.net/v2/en/cards?name=${encodeURIComponent(debouncedQuery.trim())}`)
            .then(r => r.json())
            .then(data => {
                const list = Array.isArray(data) ? data.slice(0, 8) : []
                setResults(list)
                setOpen(list.length > 0)
            })
            .catch(() => setResults([]))
            .finally(() => setLoading(false))
    }, [debouncedQuery])

    useEffect(() => {
        function handleClick(e) {
            if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
                setOpen(false)
            }
        }
        document.addEventListener('mousedown', handleClick)
        return () => document.removeEventListener('mousedown', handleClick)
    }, [])

    function handleSelect(card) {
        setQuery('')
        setOpen(false)
        setResults([])
        navigate(`/card/${card.id}`)
    }

    function handleKeyDown(e) {
        if (e.key === 'Enter' && results.length > 0) {
            handleSelect(results[0])
        }
        if (e.key === 'Escape') {
            setOpen(false)
        }
    }

    return (
        <div ref={wrapperRef} className={`relative ${className}`}>
            <div className="flex items-center flex-1 px-4 py-1.5 bg-brand-search border border-brand-search rounded-full shadow-sm hover:shadow-md transition-shadow duration-300">
                <input
                    className="w-full bg-transparent border-none outline-none text-base"
                    type="search"
                    placeholder="Buscar na loja"
                    aria-label="Search"
                    value={query}
                    onChange={e => setQuery(e.target.value)}
                    onKeyDown={handleKeyDown}
                    onFocus={() => results.length > 0 && setOpen(true)}
                />
                {loading
                    ? <div className="ml-2.5 w-4 h-4 rounded-full border-2 border-brand-300 border-t-brand-600 animate-spin shrink-0" />
                    : query
                        ? <button onClick={() => { setQuery(''); setResults([]); setOpen(false) }} className="ml-2.5 text-stone-400 hover:text-stone-600">
                            <FiX size={14} />
                          </button>
                        : <FaMagnifyingGlass className="ml-2.5 text-lg text-brand-600 shrink-0" />
                }
            </div>

            {open && results.length > 0 && (
                <div className="absolute top-full mt-2 left-0 right-0 bg-white rounded-2xl shadow-xl border border-stone-100 overflow-hidden z-50">
                    {results.map(card => (
                        <button
                            key={card.id}
                            className="w-full flex items-center gap-3 px-4 py-2.5 hover:bg-brand-50 transition-colors text-left"
                            onClick={() => handleSelect(card)}
                        >
                            {card.image && (
                                <img
                                    src={`${card.image}/low.webp`}
                                    alt={card.name}
                                    className="w-8 h-11 object-contain rounded shrink-0"
                                    onError={e => { e.target.style.display = 'none' }}
                                />
                            )}
                            <div className="min-w-0">
                                <p className="text-sm font-semibold text-stone-900 truncate">{card.name}</p>
                                <p className="text-xs text-stone-400 truncate">{card.id}</p>
                            </div>
                        </button>
                    ))}
                </div>
            )}
        </div>
    )
}

function UserMenu({ user, logout }) {
    const [open, setOpen] = useState(false)
    const menuRef = useRef(null)

    useEffect(() => {
        function handleClick(e) {
            if (menuRef.current && !menuRef.current.contains(e.target)) setOpen(false)
        }
        document.addEventListener('mousedown', handleClick)
        return () => document.removeEventListener('mousedown', handleClick)
    }, [])

    return (
        <div ref={menuRef} className="relative">
            <button
                className="flex items-center gap-1.5 text-brand-600 hover:text-brand-500 transition-colors"
                onClick={() => setOpen(o => !o)}
                aria-label="Menu do usuário"
            >
                <FaRegUser className="text-xl" />
                <span className="hidden sm:block text-sm font-medium max-w-24 truncate">{user.name}</span>
            </button>

            {open && (
                <div className="absolute right-0 top-full mt-2 w-44 bg-white rounded-xl shadow-xl border border-stone-100 overflow-hidden z-50">
                    <Link
                        to="/profile"
                        className="flex items-center gap-2.5 px-4 py-3 text-sm text-stone-700 hover:bg-brand-50 transition-colors"
                        onClick={() => setOpen(false)}
                    >
                        <FiUser size={15} />
                        Meu Perfil
                    </Link>
                    <button
                        className="w-full flex items-center gap-2.5 px-4 py-3 text-sm text-rose-500 hover:bg-rose-50 transition-colors border-t border-stone-100"
                        onClick={() => { logout(); setOpen(false) }}
                    >
                        <FiLogOut size={15} />
                        Sair
                    </button>
                </div>
            )}
        </div>
    )
}

export default function Header() {
    const { count, setIsOpen } = useCart()
    const { user, logout } = useAuth()
    const [mobileSearch, setMobileSearch] = useState(false)

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

                <SearchBar className="group hidden sm:flex items-center flex-1 max-w-xl mx-auto" />

                <div className="flex items-center gap-3 sm:gap-6 shrink-0 sm:mr-4">
                    <button className="sm:hidden" onClick={() => setMobileSearch(v => !v)} aria-label="Abrir busca">
                        <FaMagnifyingGlass className="text-xl text-brand-600" />
                    </button>

                    <Link to="/profile" state={{ tab: 'favorites' }}>
                        <FaHeart className="text-xl text-brand-600" />
                    </Link>

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

                    {user ? (
                        <UserMenu user={user} logout={logout} />
                    ) : (
                        <Link
                            to="/login"
                            className="text-sm font-semibold px-4 py-1.5 rounded-full bg-brand-500 text-white hover:opacity-90 transition-opacity"
                        >
                            Entrar
                        </Link>
                    )}
                </div>
            </div>

            {/* Mobile search bar */}
            {mobileSearch && (
                <div className="sm:hidden px-4 pb-3">
                    <SearchBar className="flex items-center w-full" />
                </div>
            )}
        </nav>
    )
}
