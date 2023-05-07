const fs = require('fs');
const path = require('path');
  
fs.readdir(
  path.join(__dirname, './secret-folder'), 
  { withFileTypes: true },
  (err, files) => {
    if (err)
      console.log(err);
    else {
      files.forEach(file => {
        const isFile = file.isFile();
        if (isFile === true) {
          const name = file.name;
          let size = 0;
          fs.stat(
            path.join(__dirname, './secret-folder', name), 
            (error, stats) => {
              if (error) {
                console.log(error);
              }
              else {
                size = stats.size / 1024;
                console.log(`${name.replace(/([.])/, ' - ')} - ${size}kb`);
              }
            });

        }
      });
    }
  });
