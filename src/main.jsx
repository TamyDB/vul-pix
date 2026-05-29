import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { DatabaseProvider } from './context/DatabaseProvider'
import { AuthProvider } from './context/AuthContext'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <DatabaseProvider>
      <AuthProvider>
        <App />
      </AuthProvider>
    </DatabaseProvider>
  </StrictMode>,
)
