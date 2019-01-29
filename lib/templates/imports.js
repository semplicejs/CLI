module.exports = () => `const fs = require('fs');
const path = require('path');
let files = fs.readdirSync(__dirname);
files.forEach((file) => {
    let filename = path.basename(file, '.js');
    if(filename !== 'index'){
        exports[filename] = require('./'+ filename);
    }
});`;