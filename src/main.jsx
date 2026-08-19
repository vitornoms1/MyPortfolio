import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { LanguageProvider } from './i18n/LanguageContext.jsx'

// Note: StrictMode intentionally double-invokes effects in dev, which
// restarts the intro's mount animation mid-way and looks like a stutter.
// Left out so the dev preview matches the production animation.
createRoot(document.getElementById('root')).render(
  <LanguageProvider>
    <App />
  </LanguageProvider>
)
