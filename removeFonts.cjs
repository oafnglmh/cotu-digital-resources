const fs = require('fs');
const path = 'e:/Ongoing_Projects/cotu-digital-resources/src/presentation/pages/Book/Book.jsx';
let content = fs.readFileSync(path, 'utf8');
content = content.replace(/fontFamily:\s*(['"`]).*?\1\s*,?\s*/g, '');
content = content.replace(/fontFamily:\s*[^,}\s]+,?/g, '');
content = content.replace(/,\s*}/g, ' }'); // clean up trailing commas before }
content = content.replace(/style=\{\{\s*\}\}/g, ''); // empty styles

// Add a single global font support
content = content.replace(
  /fontFamily:.*?,/, 
  'fontFamily: "\\"Lora\\", \\"Merriweather\\", \\"Times New Roman\\", serif",'
);

fs.writeFileSync(path, content);
console.log('done');
