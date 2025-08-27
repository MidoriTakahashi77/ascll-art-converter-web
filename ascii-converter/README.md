# ASCII Art Converter

Convert images to ASCII art instantly. Upload photos or use sample images to create unique ASCII art.

## Features

- 🖼️ Image upload support
- 🔗 Load images from URLs
- 🎨 Multiple character sets (ASCII, Blocks)
- ⚡ Real-time preview
- 📋 Copy to clipboard
- 💾 Download ASCII art as text file
- 🎯 6 sample images for quick testing
- 📱 Responsive design

## Local Development

```bash
# Run local server
python3 -m http.server 8000

# Open in browser
http://localhost:8000
```

## API Configuration

Edit `config.js` to set the API endpoint:

```javascript
API_URL: window.location.hostname === 'localhost' 
    ? 'http://localhost:8004'
    : 'https://your-api-url.com'
```

## Deployment

### Vercel

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Deploy to production
vercel --prod
```

## Technologies

- Vanilla JavaScript
- Pure CSS with animations
- HTML5 Canvas for image sampling
- Public ASCII conversion API

## License

MIT