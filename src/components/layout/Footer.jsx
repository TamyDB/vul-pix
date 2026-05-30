import { Link } from 'react-router-dom'
import { FaInstagram, FaXTwitter, FaYoutube, FaPix, FaCreditCard, FaBarcode } from 'react-icons/fa6'
import vulpix from '../../assets/vulpixLogo.svg'

const SHOP_LINKS = [
    { label: 'Explorar cartas', to: '/cardmarket' },
    { label: 'Promoções', to: '/cardmarket' },
    { label: 'Novidades', to: '/cardmarket' },
    { label: 'Coleções', to: '/cardmarket' },
]

const ACCOUNT_LINKS = [
    { label: 'Entrar', to: '/login' },
    { label: 'Cadastrar', to: '/cadastro' },
    { label: 'Meus pedidos', to: '/perfil' },
    { label: 'Favoritos', to: '/perfil' },
]

const SUPPORT_LINKS = [
    { label: 'Contato', to: '#' },
    { label: 'Trocas e devoluções', to: '#' },
    { label: 'Rastrear pedido', to: '#' },
    { label: 'FAQ', to: '#' },
]

const SOCIAL = [
    { icon: FaInstagram, href: '#', label: 'Instagram' },
    { icon: FaXTwitter, href: '#', label: 'X (Twitter)' },
    { icon: FaYoutube, href: '#', label: 'YouTube' },
]

const PAYMENT = [
    { icon: FaPix, label: 'Pix' },
    { icon: FaCreditCard, label: 'Cartão' },
    { icon: FaBarcode, label: 'Boleto' },
]

function LinkColumn({ title, links }) {
    return (
        <div className="flex flex-col gap-3">
            <h4 className="text-xs font-semibold uppercase tracking-widest text-brand-300 mb-1">
                {title}
            </h4>
            {links.map(({ label, to }) => (
                <Link
                    key={label}
                    to={to}
                    className="text-sm text-slate-400 hover:text-white transition-colors duration-150"
                >
                    {label}
                </Link>
            ))}
        </div>
    )
}

export default function Footer() {
    const year = new Date().getFullYear()

    return (
        <footer className="bg-brand-900 text-white mt-20">
            <div className="max-w-7xl mx-auto px-6 py-12">

                {/* ── Grade principal ── */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-10">

                    {/* Marca */}
                    <div className="flex flex-col sm:col-span-2 lg:col-span-1">
                        <img
                            src={vulpix}
                            alt="Vul-pix"
                            className="h-20 w-auto object-contain object-left"
                        />
                        <p className="text-sm text-slate-400 leading-relaxed max-w-xs">
                            O marketplace dos melhores colecionadores de Pokémon TCG do Brasil.
                        </p>
                        <div className="flex gap-2 mt-1">
                            {SOCIAL.map(({ icon: Icon, href, label }) => (
                                <a
                                    key={label}
                                    href={href}
                                    aria-label={label}
                                    className="w-9 h-9 rounded-lg bg-white/10 hover:bg-brand-500 flex items-center justify-center transition-colors duration-200"
                                >
                                    <Icon className="w-4 h-4" />
                                </a>
                            ))}
                        </div>
                    </div>

                    <LinkColumn title="Loja" links={SHOP_LINKS} />
                    <LinkColumn title="Conta" links={ACCOUNT_LINKS} />
                    <LinkColumn title="Suporte" links={SUPPORT_LINKS} />
                </div>

                {/* ── Divider ── */}
                <div className="border-t border-white/10 my-6" />

                {/* ── Rodapé inferior ── */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div className="space-y-1 text-xs text-slate-400">
                        <p>&copy; {year} Vul-pix Store. Todos os direitos reservados.</p>
                        <p>CNPJ: 00.000.000/0001-00</p>
                    </div>

                    <div className="flex items-center gap-3">
                        <span className="text-xs text-slate-500 mr-1">Pagamentos</span>
                        {PAYMENT.map(({ icon: Icon, label }) => (
                            <div
                                key={label}
                                title={label}
                                className="w-9 h-9 rounded-lg bg-white/10 flex items-center justify-center"
                            >
                                <Icon className="w-4 h-4 text-slate-300" />
                            </div>
                        ))}
                    </div>
                </div>

            </div>
        </footer>
    )
}
