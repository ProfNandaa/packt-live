const Joi = require('joi');
const Knex = require('../db');

const todo = require('../services/todo');

const routes = [
  {
    method: 'GET',
    path: '/todo',
    handler: todo.getTodos,
  },
  {
    method: 'GET',
    path: '/todo/{id}',
    handler: todo.getTodo,
  },
  {
    method: 'POST',
    path: '/todo',
    handler: todo.createTodo,
    config: {
      validate: {
        payload: {
          title: Joi.string().required(),
        },
      }
    }
  },
  {
    method: 'PUT',
    path: '/todo/{id}',
    handler: todo.updateTodo,
    config: {
      validate: {
        payload: {
          title: Joi.string().required(),
        }
      }
    }
  },
  {
    method: 'PATCH',
    path: '/todo/{id}',
    handler: async (request, reply) => {
      // take-home
      // still do update
      return reply({ message: 'patched' });
    }
  },
  {
    method: 'DELETE',
    path: '/todo/{id}',
    handler: todo.deleteTodo
  }
];

module.exports = routes;
