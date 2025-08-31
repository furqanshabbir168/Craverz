import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import ShopContextProvider from './Context/ShopContext.jsx'
import ErrorBoundary from './Components/ErrorBoundary.jsx'

createRoot(document.getElementById('root')).render(
  
  <BrowserRouter><ShopContextProvider><ErrorBoundary><App /></ErrorBoundary></ShopContextProvider></BrowserRouter>
   
  
)
