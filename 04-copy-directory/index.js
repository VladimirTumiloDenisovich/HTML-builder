
const fs = require('fs');
const path = require('path');
const fsPromises = fs.promises;

fsPromises.mkdir(
  path.join(__dirname, './', 'files-copy'),
  { recursive: true });

fs.readdir(
  path.join(__dirname, './files-copy'),
  (err, files) => {
    if (err)
      console.log(err);
    else {
      files.forEach(file => {
        fs.unlink(
          path.join(__dirname, './files-copy', file),
          (err) => {
            if (err) throw err;
          });
      });
      fs.readdir(
        path.join(__dirname, './files'),
        (err, files) => {
          if (err)
            console.log(err);
          else {
            files.forEach(file => {
              fsPromises.copyFile(
                path.join(__dirname, './files', file),
                path.join(__dirname, './files-copy', file))
                .then(function() {
                  console.log('File copied - ' + file);
                })
                .catch(function(error) {
                  console.log(error);
                });
            });
          }
        });
    }
  });
  