#!/usr/bin/env node

// Script to generate env.js file with environment variables
const fs = require('fs');
const path = require('path');

const envContent = `// This file is generated at build time with environment variables
window.ENV = {
  API_URL: '${process.env.API_URL || ''}'
};`;

// Write directly to root directory for static site
const rootDir = path.join(__dirname, '..');
fs.writeFileSync(path.join(rootDir, 'env.js'), envContent);
console.log('✅ Generated env.js with environment variables');