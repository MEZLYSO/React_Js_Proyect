import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './assets/normalize.css' // Normaliza los estilos de la pagina
import './index.css'
import App from './App.jsx'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
