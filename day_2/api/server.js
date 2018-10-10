const Hapi = require('hapi');
const good = require('good');
const hapiAuthJwt = require('hapi-auth-jwt');

const routes = {};
routes.todo = require('./routes/todo');
routes.auth = require('./routes/auth');

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
server.route(routes.auth);

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

// register the auth strategy
server.register(hapiAuthJwt, (err) => {
  server.auth.strategy('token', 'jwt', {
    key: 'my-secret-key',
    verifyOptions: {
      algorithms: [ 'HS256' ],
    },
  });

  // add the routes!!!
  // add strategy to all the .todo routes
  const authRoutes = routes.todo.map(route => {
    const authConfig = { strategy: 'token' };
    if (route.config) route.config.auth = authConfig;
    else {
      route.config = {
        auth: authConfig
      }
    }
    return route;
  });
  server.route(authRoutes);
});

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
