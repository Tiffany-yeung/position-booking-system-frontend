import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import { SaltProvider } from "@salt-ds/core";
import "@salt-ds/theme/index.css";
import './index.css'

createRoot(document.getElementById('root')!).render(
  <SaltProvider density='low'>
    <StrictMode>
      <App />
    </StrictMode>
  </SaltProvider>
)
