const http = require('http')

const server = http.createServer((req, res) => {
  console.log('request served');

  // respond
  res.write('hello, world => API!');
  res.end();
});

const port = 5000;

server.listen(port);
console.log(`Server running at http://localhost:${port}`);
