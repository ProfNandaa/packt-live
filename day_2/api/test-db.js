const Knex = require('./db');

Knex.raw('SELECT 1 + 1 as sum')
  .catch(err => console.log(err.message))
  .then(res => console.log('connected: ', res[0][0].sum));
