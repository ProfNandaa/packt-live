const Hapi = require('hapi');
const good = require('good');

const routes = {};
routes.todo = require('./routes/todo');

// create server with the host / port
const server = new Hapi.Server();
server.connection({
  host: 'localhost',
  port: 8000,
});

// add the route
server.route({
  method: 'GET',
  path: '/',
  handler: (request, reply) => {
    return reply({ greeting: 'hello, world => API!' });
  }
});

// load other routes
server.route(routes.todo);

// configs for logging
const options = {
  ops: {
    interval: 100000,
  },
  reporters: {
    consoleReporters: [
      { module: 'good-console' },
      'stdout',
    ],
  }
};

server.register({
  register: good,
  options
}, (err) => {
  if (err) return console.error(err);

  // start the server
  server.start((err) => {
    if (err) throw err;
    console.log(`Server running at: ${server.info.uri}`);
  });
});
