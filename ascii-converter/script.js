// ASCII Art Converter - Main Script
const config = window.APP_CONFIG;

// State management
let currentImageBase64 = '';
let isConverting = false;

// DOM Elements
const elements = {
    imageFile: document.getElementById('imageFile'),
    fileLabel: document.querySelector('.file-label'),
    imageUrl: document.getElementById('imageUrl'),
    loadUrlBtn: document.getElementById('loadUrlBtn'),
    width: document.getElementById('width'),
    widthValue: document.getElementById('widthValue'),
    brightness: document.getElementById('brightness'),
    brightnessValue: document.getElementById('brightnessValue'),
    charset: document.getElementById('charset'),
    invert: document.getElementById('invert'),
    colored: document.getElementById('colored'),
    convertBtn: document.getElementById('convertBtn'),
    copyBtn: document.getElementById('copyBtn'),
    downloadBtn: document.getElementById('downloadBtn'),
    asciiOutput: document.getElementById('asciiOutput'),
    preview: document.getElementById('preview'),
    metadata: document.getElementById('metadata'),
    statusIndicator: document.getElementById('statusIndicator'),
    statusText: document.getElementById('statusText'),
};

// Initialize
document.addEventListener('DOMContentLoaded', init);

function init() {
    setupEventListeners();
    checkAPIStatus();
    updateRangeDisplays();
}

function setupEventListeners() {
    // File input
    elements.imageFile.addEventListener('change', handleFileSelect);
    
    // URL input
    elements.loadUrlBtn.addEventListener('click', loadFromUrl);
    elements.imageUrl.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') loadFromUrl();
    });
    
    // Range inputs
    elements.width.addEventListener('input', updateRangeDisplays);
    elements.brightness.addEventListener('input', updateRangeDisplays);
    
    // Sample buttons
    document.querySelectorAll('.sample-btn').forEach(btn => {
        btn.addEventListener('click', () => loadSampleImage(btn.dataset.sample));
    });
    
    // Action buttons
    elements.convertBtn.addEventListener('click', convertImage);
    elements.copyBtn.addEventListener('click', copyToClipboard);
    elements.downloadBtn.addEventListener('click', downloadAscii);
}

function updateRangeDisplays() {
    elements.widthValue.textContent = elements.width.value;
    elements.brightnessValue.textContent = elements.brightness.value;
}

async function checkAPIStatus() {
    try {
        const response = await fetch(`${config.API_URL}/api/health`, {
            headers: config.API_KEY ? { 'X-API-Key': config.API_KEY } : {}
        });
        
        if (response.ok) {
            setAPIStatus('online', 'API Connected');
        } else {
            setAPIStatus('offline', 'API Unavailable');
        }
    } catch (error) {
        setAPIStatus('offline', 'Cannot reach API');
    }
}

function setAPIStatus(status, message) {
    elements.statusIndicator.className = `status-indicator ${status}`;
    elements.statusText.textContent = message;
}

function handleFileSelect(event) {
    const file = event.target.files[0];
    if (!file) return;
    
    if (file.size > config.MAX_FILE_SIZE) {
        showError(`File too large. Max size: ${config.MAX_FILE_SIZE / 1024 / 1024}MB`);
        return;
    }
    
    if (!file.type.startsWith('image/')) {
        showError('Please select an image file');
        return;
    }
    
    const reader = new FileReader();
    reader.onload = (e) => {
        currentImageBase64 = e.target.result.split(',')[1];
        displayPreview(e.target.result);
        elements.fileLabel.textContent = file.name;
        elements.fileLabel.classList.add('has-file');
    };
    reader.readAsDataURL(file);
}

function displayPreview(dataUrl) {
    elements.preview.innerHTML = `<img src="${dataUrl}" alt="Preview">`;
}

function loadSampleImage(type) {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    
    switch(type) {
        case 'gradient':
            createGradient(canvas, ctx);
            break;
        case 'circle':
            createCircle(canvas, ctx);
            break;
        case 'photo':
            createPhoto(canvas, ctx);
            break;
        case 'logo':
            createLogo(canvas, ctx);
            break;
        case 'text':
            createText(canvas, ctx);
            break;
        case 'pattern':
            createPattern(canvas, ctx);
            break;
    }
    
    const dataUrl = canvas.toDataURL('image/png');
    currentImageBase64 = dataUrl.split(',')[1];
    displayPreview(dataUrl);
    elements.fileLabel.textContent = `Sample: ${type}`;
    elements.fileLabel.classList.add('has-file');
}

// Sample image generators
function createGradient(canvas, ctx) {
    canvas.width = 200;
    canvas.height = 200;
    const gradient = ctx.createLinearGradient(0, 0, 200, 200);
    gradient.addColorStop(0, '#000000');
    gradient.addColorStop(0.5, '#808080');
    gradient.addColorStop(1, '#ffffff');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 200, 200);
}

function createCircle(canvas, ctx) {
    canvas.width = 200;
    canvas.height = 200;
    ctx.fillStyle = '#000000';
    ctx.fillRect(0, 0, 200, 200);
    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    ctx.arc(100, 100, 80, 0, Math.PI * 2);
    ctx.fill();
}

function createPhoto(canvas, ctx) {
    canvas.width = 300;
    canvas.height = 200;
    // Sky
    const sky = ctx.createLinearGradient(0, 0, 0, 100);
    sky.addColorStop(0, '#87CEEB');
    sky.addColorStop(1, '#ffffff');
    ctx.fillStyle = sky;
    ctx.fillRect(0, 0, 300, 100);
    // Ground
    ctx.fillStyle = '#228B22';
    ctx.fillRect(0, 100, 300, 100);
    // Tree trunk
    ctx.fillStyle = '#8B4513';
    ctx.fillRect(130, 80, 40, 60);
    // Tree top
    ctx.fillStyle = '#228B22';
    ctx.beginPath();
    ctx.moveTo(150, 30);
    ctx.lineTo(100, 80);
    ctx.lineTo(200, 80);
    ctx.closePath();
    ctx.fill();
}

function createLogo(canvas, ctx) {
    canvas.width = 200;
    canvas.height = 200;
    ctx.fillStyle = '#1a1a1a';
    ctx.fillRect(0, 0, 200, 200);
    ctx.fillStyle = '#4fc3f7';
    ctx.font = 'bold 48px Arial';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('OTTO', 100, 100);
}

function createText(canvas, ctx) {
    canvas.width = 300;
    canvas.height = 100;
    // Dark background for better contrast
    ctx.fillStyle = '#000000';
    ctx.fillRect(0, 0, 300, 100);
    // White text
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 36px Arial';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('Hello ASCII!', 150, 50);
}

function createPattern(canvas, ctx) {
    canvas.width = 200;
    canvas.height = 200;
    const size = 20;
    for (let i = 0; i < 10; i++) {
        for (let j = 0; j < 10; j++) {
            ctx.fillStyle = (i + j) % 2 === 0 ? '#000000' : '#ffffff';
            ctx.fillRect(i * size, j * size, size, size);
        }
    }
}

async function convertImage() {
    if (!currentImageBase64) {
        showError('Please select an image first');
        return;
    }
    
    if (isConverting) return;
    
    isConverting = true;
    elements.convertBtn.textContent = 'Converting...';
    elements.convertBtn.disabled = true;
    
    try {
        // Determine endpoint based on config
        const endpoint = config.USE_PUBLIC_ENDPOINT ? '/api/public/convert' : '/api/convert';
        
        const headers = {
            'Content-Type': 'application/json'
        };
        
        if (!config.USE_PUBLIC_ENDPOINT && config.API_KEY) {
            headers['X-API-Key'] = config.API_KEY;
        }
        
        const response = await fetch(`${config.API_URL}${endpoint}`, {
            method: 'POST',
            headers,
            body: JSON.stringify({
                image: currentImageBase64,
                options: {
                    width: parseInt(elements.width.value),
                    charset: elements.charset.value,
                    invert: elements.invert.checked,
                    colored: elements.colored.checked && config.ENABLE_COLORED_OUTPUT,
                    brightness: parseInt(elements.brightness.value)
                }
            })
        });
        
        const result = await response.json();
        
        if (result.success) {
            displayResult(result.data);
        } else {
            showError(result.error?.message || 'Conversion failed');
        }
    } catch (error) {
        showError(`Connection error: ${error.message}`);
    } finally {
        isConverting = false;
        elements.convertBtn.textContent = 'Convert to ASCII';
        elements.convertBtn.disabled = false;
    }
}

function displayResult(data) {
    elements.asciiOutput.textContent = data.ascii;
    
    elements.metadata.innerHTML = `
        <strong>Image Details:</strong><br>
        Output: ${data.metadata.width} × ${data.metadata.height} characters<br>
        Original: ${data.metadata.originalWidth} × ${data.metadata.originalHeight} pixels<br>
        Character set: ${data.metadata.charset}
        ${data.metadata.colored ? '<br>Color: ANSI colors applied' : ''}
    `;
    
    // Smooth scroll to output
    elements.asciiOutput.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

function copyToClipboard() {
    const text = elements.asciiOutput.textContent;
    if (!text || text === 'ASCII art will appear here...') {
        showError('No ASCII art to copy');
        return;
    }
    
    navigator.clipboard.writeText(text).then(() => {
        const originalText = elements.copyBtn.textContent;
        elements.copyBtn.textContent = '✅ Copied!';
        setTimeout(() => {
            elements.copyBtn.textContent = originalText;
        }, 2000);
    }).catch(() => {
        showError('Failed to copy to clipboard');
    });
}

function downloadAscii() {
    const text = elements.asciiOutput.textContent;
    if (!text || text === 'ASCII art will appear here...') {
        showError('No ASCII art to download');
        return;
    }
    
    const blob = new Blob([text], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `ascii-art-${Date.now()}.txt`;
    a.click();
    URL.revokeObjectURL(url);
}

function showError(message) {
    // Create toast notification
    const toast = document.createElement('div');
    toast.className = 'error-toast';
    toast.textContent = message;
    toast.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        background: #f44336;
        color: white;
        padding: 12px 20px;
        border-radius: 6px;
        z-index: 1000;
        animation: slideIn 0.3s ease;
    `;
    document.body.appendChild(toast);
    
    setTimeout(() => {
        toast.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

async function loadFromUrl() {
    const url = elements.imageUrl.value.trim();
    if (!url) {
        showError('Please enter a valid image URL');
        return;
    }
    
    // Check if URL is valid
    try {
        new URL(url);
    } catch {
        showError('Invalid URL format');
        return;
    }
    
    // Skip image extension check - let the server validate instead
    
    try {
        elements.loadUrlBtn.textContent = 'Loading...';
        elements.loadUrlBtn.disabled = true;
        
        // Use a CORS proxy for external images
        const corsProxy = 'https://corsproxy.io/?';
        const proxyUrl = url.startsWith('http://localhost') || url.startsWith('https://localhost') 
            ? url 
            : corsProxy + encodeURIComponent(url);
        
        const response = await fetch(proxyUrl);
        if (!response.ok) {
            throw new Error('Failed to load image from URL');
        }
        
        const blob = await response.blob();
        const reader = new FileReader();
        reader.onload = (e) => {
            currentImageBase64 = e.target.result.split(',')[1];
            displayPreview(e.target.result);
            elements.fileLabel.textContent = 'Image from URL';
            elements.fileLabel.classList.add('has-file');
            // Success message
            const originalText = elements.loadUrlBtn.textContent;
            elements.loadUrlBtn.textContent = '✅ Loaded!';
            setTimeout(() => {
                elements.loadUrlBtn.textContent = originalText;
            }, 2000);
        };
        reader.readAsDataURL(blob);
        
    } catch (error) {
        showError(`Failed to load image: ${error.message}`);
    } finally {
        elements.loadUrlBtn.textContent = 'Load';
        elements.loadUrlBtn.disabled = false;
    }
}

// Add animation styles
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    @keyframes slideOut {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
    }
`;
document.head.appendChild(style);