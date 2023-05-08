const fs = require('fs');
const path = require('path');
const output = fs.createWriteStream(
  path.join(__dirname, './project-dist', 'bundle.css'),
);


let data = [];

fs.readdir(
  path.join(__dirname, './styles'), 
  { withFileTypes: true },
  (err, files) => {
    if (err)
      console.log(err);
    else {
      files.forEach(file => {
        const isFile = file.isFile();
        const isCSS = path.extname(file.name);
        if (isFile === true && isCSS.trim() === '.css') {
          const nameFile = file.name;

          const stream = fs.createReadStream(
            path.join(__dirname, './styles', nameFile),
            'utf-8'
          );
          
          stream.on('data', chunk => data += chunk);
          stream.on('end', () => {
            output.write(data);
          });
          stream.on('error', error => console.log('Error', error.message));
        }
      });
    }
  });
