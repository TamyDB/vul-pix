import { useState, useEffect } from 'react'
import MainPage from './pages/MainPage'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className='flex justify-center'>
      <MainPage />
    </div>
  )
}

export default App
