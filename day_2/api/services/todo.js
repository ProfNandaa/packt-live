const Knex = require('../db');

const getTodos = async (request, reply) => {
  const userId = request.auth.credentials.id;
  const todos = await Knex('todo')
    .where('user_id', userId);
  return reply(todos);
};

const getTodo = async (request, reply) => {
  const userId = request.auth.credentials.id;
  const todo = await Knex('todo')
    .where({
      id: request.params.id,
      user_id: userId
    });
  // same as
  // SELECT * FROM todo
  // WHERE id = <id> AND user_id = 1

  // TODO: include todo_items in the results
  if (todo[0]) return reply(todo[0]);
  // if the index doesn't exist
  return reply({ message: 'Not found' }).code(404);
};

const createTodo = async (request, reply) => {
  // hard-code userId
  const userId = request.auth.credentials.id;
  const todo = request.payload; // request body
  todo.user_id = userId; // todo => { title: ..., user_id: ... }
  const inserted = await Knex('todo')
    .returning('id')
    .insert(todo);
  return reply({ message: 'created', todo_id:  inserted[0] }).code(201)
};

const updateTodo = async (request, reply) => {
  // Knex('<table_name>').where('', '').update({ ... })
  const userId = request.auth.credentials.id;
  const id = request.params.id;
  const todo = request.payload;
  const updated = await Knex('todo')
    .where({ id: id, user_id: userId })
    .update(todo);
  if (updated) return reply({ message: 'updated'});
  return reply({ message: 'not updated' })
};

const deleteTodo = async (request, reply) => {
  const userId = request.auth.credentials.id;
  const id = request.params.id;
  const deleted = await Knex('todo')
    .where({ user_id: userId, id: id })
    .delete();
  if (deleted) return reply({ message: 'deleted' });
  return reply({ message: 'not deleted' });
};

module.exports = {
  getTodos,
  getTodo,
  createTodo,
  updateTodo,
  deleteTodo,
}