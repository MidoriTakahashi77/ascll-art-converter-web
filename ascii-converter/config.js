// Configuration for ASCII Art Converter
// This file manages environment-specific settings

const CONFIG = {
    // API Configuration
    // For production, set API_URL in Vercel environment variables
    API_URL: window.location.hostname === 'localhost' 
        ? 'http://localhost:8004'  // Local development
        : (window.ENV?.API_URL || 'https://ottoproject-image-ascii-api-rirafu7rda-an.a.run.app'), // Production - fallback to actual URL
    
    // API Key (for authenticated endpoints)
    // In production, this should be empty for public access
    // or use a proxy server to hide the key
    API_KEY: '',
    
    // Public endpoints (no auth required)
    USE_PUBLIC_ENDPOINT: true,
    
    // Feature flags
    ENABLE_COLORED_OUTPUT: true,
    ENABLE_FILE_UPLOAD: true,
    ENABLE_URL_CONVERT: false, // Disabled for security in public version
    
    // Limits
    MAX_WIDTH: 200,
    MIN_WIDTH: 20,
    DEFAULT_WIDTH: 80,
    MAX_FILE_SIZE: 5 * 1024 * 1024, // 5MB
    
    // Sample images configuration
    SAMPLES_ENABLED: true,
    
    // Analytics (optional)
    ANALYTICS_ID: '', // Google Analytics or similar
};

// Export for use in script.js
window.APP_CONFIG = CONFIG;