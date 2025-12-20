// Dynamic configuration loader
(function() {
  // Try to get API URL from environment variable
  const apiUrl = '%VITE_API_URL%' !== '%VITE_API_URL%' ? '%VITE_API_URL%' : null;
  
  if (apiUrl && apiUrl !== '%VITE_API_URL%') {
    window.API_URL = apiUrl;
    console.log('API URL configured to:', apiUrl);
  } else {
    // Fallback: use same origin or localhost
    window.API_URL = window.location.origin + '/api' || 'http://localhost:3000/api';
    console.log('Using fallback API URL:', window.API_URL);
  }
})();
