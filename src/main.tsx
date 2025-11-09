import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.tsx'
import './index.css' // Import main index.css with Tailwind directives first
import './styles/index.css' // Then import our custom styles
import './App.css'

// Add custom fonts - only keeping essential weights
import '@fontsource/oswald/400.css' // Regular weight
import '@fontsource/oswald/700.css' // Bold weight

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
