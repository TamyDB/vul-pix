import { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import Header from './Header'
import Footer from './Footer'
import CartDrawer from '../CartDrawer'

function ScrollToTop() {
    const { pathname } = useLocation()
    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'instant' })
    }, [pathname])
    return null
}

export default function Layout() {
    return (
        <div className="flex flex-col min-h-screen">
            <ScrollToTop />
            <Header />
            <CartDrawer />
            <main className="flex-1 w-full px-4 sm:px-8 lg:px-16 mt-4">
                <Outlet />
            </main>
            <Footer />
        </div>
    )
}
