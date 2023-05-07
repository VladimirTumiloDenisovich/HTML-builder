const fs = require('fs');
const path = require('path');
const { stdin, stdout } = process;

const output = fs.createWriteStream(
  path.join(__dirname, './', 'yourself.txt'),
);

stdout.write('Hello!\nDescribe yourself\n');
stdin.on('data', data => {
  const dataString = data.toString();
  const exit = 'exit';
  if (dataString.trim() == exit) {
    process.exit();
  } else {
    stdout.write('Describe yourself more\n');

    output.write(data);
  }
});

process.on('SIGINT', () => process.exit());
process.on('exit', () => stdout.write('\nGood luck!\n'));
