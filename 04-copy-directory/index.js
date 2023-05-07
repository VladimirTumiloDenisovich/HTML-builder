
const fs = require('fs');
const path = require('path');
const fsPromises = fs.promises;


function copyDir (namePastFolder, pathCopyFolder) {
  fsPromises.mkdir(
    path.join(__dirname, './', namePastFolder),
    { recursive: true });

  fs.readdir(
    path.join(__dirname, './', namePastFolder),
    (err, files) => {
      if (err)
        console.log(err);
      else {
        files.forEach(file => {
          fs.unlink(
            path.join(__dirname, './' + namePastFolder, file),
            (err) => {
              if (err) throw err;
            });
        });
        fs.readdir(
          path.join(__dirname, pathCopyFolder),
          (err, files) => {
            if (err)
              console.log(err);
            else {
              files.forEach(file => {
                fsPromises.copyFile(
                  path.join(__dirname, pathCopyFolder, file),
                  path.join(__dirname, './' + namePastFolder, file))
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
}

copyDir('files-copy', './files');
