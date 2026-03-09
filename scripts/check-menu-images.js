const fs = require('fs');
const path = require('path');

const projectRoot = path.join(__dirname, '..');
const jsonPath = path.join(projectRoot, 'data', 'menu-refined-with-images.json');

if (!fs.existsSync(jsonPath)) {
    console.error('JSON file not found at:', jsonPath);
    process.exit(1);
}

const items = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));
let found = 0;
let missing = 0;
const missingItems = [];

items.forEach(item => {
    if (item.image && item.image.main) {
        // remove leading slash for joining correctly relative to projectRoot
        const relativePath = item.image.main.replace(/^\//, '');
        const fullPath = path.join(projectRoot, relativePath);
        
        if (fs.existsSync(fullPath)) {
            found++;
        } else {
            missing++;
            missingItems.push(item.image.main);
        }
    }
});

console.log('--- Menu Images Check ---');
console.log('Total items checked:', items.length);
console.log('Images found:', found);
console.log('Images missing:', missing);

if (missing > 0) {
    console.log('\nMissing file paths:');
    missingItems.forEach(p => console.log('  ' + p));
}