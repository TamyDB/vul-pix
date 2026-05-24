import { BrowserRouter, Routes, Route } from 'react-router-dom'
import MainPage from './pages/MainPage'
import PaginaCompra from './pages/PaginaCompra'

function App() {
  return (
    <BrowserRouter basename="/vul-pix">
      <div className='w-full'>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/compra" element={<PaginaCompra />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App