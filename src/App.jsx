import { useState } from 'react'
import vulpixLogo from '/vulpixLogo.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <a href="https://github.com/tamydb/vul-pix" target="_blank">
          <img src={vulpixLogo} className="logo" alt="Vite logo" />
        </a>
      </div>
      <h1>Vul-Pix</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          Contador está em {count}
        </button>
        <p>
          WIP
        </p>
        <p>Clique na logo para ser redirecionado ao repositório do github</p>
      </div>
    </>
  )
}

export default App
