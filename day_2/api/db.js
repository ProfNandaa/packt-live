// simplified version
const config = {
  client: 'mysql',
  connection: {
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'todo_live', // yours is 'todo'
    charset: 'utf8'
  }
};

// Create the Knex instance
const Knex = require('knex')(config);

module.exports = Knex;
