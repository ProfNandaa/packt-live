// we are going to use the fs (inbuilt) module
const fs = require('fs');

let file = `${__dirname}/tmp/sample.txt`;

fs.readFile(file, 'utf8', (err, data) => {
  if (err) throw err;
  console.log(data);
});

console.log('print last!');

