import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { IconContext } from '@phosphor-icons/react'
import '@fontsource/ibm-plex-sans-thai/400.css'
import '@fontsource/ibm-plex-sans-thai/500.css'
import '@fontsource/ibm-plex-sans-thai/600.css'
import '@fontsource/ibm-plex-sans-thai/700.css'
import '@fontsource-variable/bricolage-grotesque'
import '@fontsource/ibm-plex-mono/500.css'
import '@fontsource/ibm-plex-mono/600.css'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* ไอคอนทั้งเว็บ: สไตล์ duotone ขนาดเท่าตัวอักษรของกล่องที่อยู่ */}
    <IconContext.Provider value={{ weight: 'duotone', size: '1em' }}>
      <App />
    </IconContext.Provider>
  </StrictMode>,
)
