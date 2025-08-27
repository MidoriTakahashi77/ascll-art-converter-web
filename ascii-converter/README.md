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

### Local Development
API automatically connects to `http://localhost:8004`

### Production (Vercel)
Set the `API_URL` environment variable in Vercel:

1. Go to Vercel Dashboard > Project Settings > Environment Variables
2. Add variable:
   - Name: `API_URL`
   - Value: `https://your-api-url.a.run.app`
3. Redeploy for changes to take effect

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

#### Setting Environment Variables

```bash
# Via CLI
vercel env add API_URL

# Or via Dashboard
# Project Settings > Environment Variables
```

## Technologies

- Vanilla JavaScript
- Pure CSS with animations
- HTML5 Canvas for image sampling
- Public ASCII conversion API

## License

MIT