import { BrowserRouter, Routes, Route } from 'react-router-dom'
import MainPage from './pages/MainPage'
import PaginaCompra from './pages/PaginaCompra'
import Cadastro from './pages/Cadastro'
import Login from './pages/Login'

function App() {
  return (
    <BrowserRouter basename="/vul-pix">
      <div className='w-full'>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/compra" element={<PaginaCompra />} />
          <Route path="/cadastro" element={<Cadastro />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
