import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import 'bootstrap/dist/css/bootstrap.min.css'
import './bootstrap.min.css'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import ContextShare from './Context/ContextShare.jsx'


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ContextShare>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ContextShare>
  </React.StrictMode>,
)
