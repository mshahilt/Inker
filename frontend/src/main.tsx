import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <div vaul-drawer-wrapper="" className="bg-background"><App/></div>
    </StrictMode>,
)
