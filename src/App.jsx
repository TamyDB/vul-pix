import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { CartProvider } from './context/CartContext'
import MainPage from './pages/MainPage'
import CardDetail from './pages/CardDetail'
import Login from './pages/Login'
import Cadastro from './pages/Cadastro'
import Layout from './components/layout/Layout'

function App() {
  return (
    <CartProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<MainPage />} />
            <Route path="card/:id" element={<CardDetail />} />
          </Route>
          <Route path="/login" element={<Login />} />
          <Route path="/cadastro" element={<Cadastro />} />
        </Routes>
      </BrowserRouter>
    </CartProvider>
  )
}

export default App
