import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

// CSS: 
import './assets/css/bootstrap.min.css'
import './assets/css/style.css'

// JS: 
import './assets/js/jquery.min.js' 
import './assets/js/bootstrap.min.js'

import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
