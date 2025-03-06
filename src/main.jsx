import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Provider as ChakraProvider} from './src/components/ui/provider'
import { HashRouter } from 'react-router-dom'
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <HashRouter>
    <ChakraProvider>
      <App />
    </ChakraProvider>
    </HashRouter>

  </StrictMode>,
)
