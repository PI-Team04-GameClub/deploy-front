// Dynamic configuration loader - runs at page load time
(function() {
  // Get API URL from meta tag or data attribute set by server
  const metaTag = document.querySelector('meta[name="api-url"]');
  if (metaTag && metaTag.getAttribute('content')) {
    window.API_URL = metaTag.getAttribute('content');
    console.log('API URL from meta tag:', window.API_URL);
    return;
  }
  
  // Fallback: use relative path to backend
  window.API_URL = window.location.origin + '/api';
  console.log('Using origin-based API URL:', window.API_URL);
})();
