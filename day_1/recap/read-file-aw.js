const fs = require('fs');
const util = require('util');

const readFile = util.promisify(fs.readFile);

// list of files
const files = [
  'tmp/sample.txt',
  'tmp/sample_1.txt',
  'tmp/sample_2.txt',
]

async function run() {
  const sample = await readFile(`${__dirname}/tmp/sample.txt`, 'utf8');

  console.log(sample);
  console.log('print this last!');

  // loop
  for (let file of files) {
    const f = await readFile(`${__dirname}/${file}`, 'utf8')
    console.log(f)
  }
}

run();
