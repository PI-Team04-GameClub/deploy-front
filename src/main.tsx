import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

// Set API URL from environment variable at runtime
if (typeof window !== 'undefined') {
  const apiUrl = import.meta.env.VITE_API_URL;
  if (apiUrl) {
    (window as any).API_URL = apiUrl;
    console.log('✅ API URL set from VITE_API_URL:', apiUrl);
  } else {
    (window as any).API_URL = 'http://localhost:3000/api';
    console.log('⚠️ Using default API URL');
  }
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
