import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// Guard against third-party browser extensions throwing unhandled exceptions in iframe
if (typeof window !== 'undefined') {
  window.addEventListener(
    'error',
    (event) => {
      const filename = event.filename || '';
      const message = event.message || '';
      if (
        filename.includes('chrome-extension://') ||
        filename.includes('moz-extension://') ||
        filename.includes('safari-extension://') ||
        message.includes("Cannot read properties of undefined (reading 'onMessage')")
      ) {
        event.stopImmediatePropagation();
        event.preventDefault();
      }
    },
    true
  );
}

createRoot(document.getElementById('root')!).render(<App />);
