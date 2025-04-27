const fs = require('fs');
const path = require('path');

const publicDir = path.join(__dirname, '../public');

function checkUppercaseFiles(dir) {
  const files = fs.readdirSync(dir);
  files.forEach(file => {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      checkUppercaseFiles(fullPath);
    } else {
      if (/[A-Z]/.test(file)) {
        console.warn(`⚠️  Uppercase found: ${fullPath}`);
      }
    }
  });
}

console.log('🔍 Scanning /public for files with UPPERCASE letters...');
checkUppercaseFiles(publicDir);
console.log('✅ Scan completed.');
