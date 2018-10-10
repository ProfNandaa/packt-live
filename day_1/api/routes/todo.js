const Joi = require('joi');

const todoList = [
  {
    title: 'Shopping',
    dateCreated: 'Oct 9, 2018',
    list: [
      { text: 'Node.js Books', done: false },
      { text: 'MacBook', done: false },
      { text: 'Shoes', done: true },
    ]
  },
  {
    title: 'Places to Visit',
    dateCreated: 'Aug 10, 2018',
    list: [
      { text: 'Nairobi, Kenya', done: false },
      { text: 'Moscow, Russia', done: false },
      { text: 'Mumbai, India', done: false },
    ]
  },
  {
    title: 'Languages to Learn',
    dateCreated: 'Oct 10, 2018',
    list: [
      { text: 'Java EE', done: false },
      { text: 'JavaScript', done: true },
      { text: 'Python', done: false },
    ]
  }
];

const routes = [
  {
    method: 'GET',
    path: '/todo',
    handler: (request, reply) => {
      return reply(todoList);
    }
  },
  {
    method: 'GET',
    path: '/todo/{id}',
    handler: (request, reply) => {
      const id = request.params.id - 1; // array is 0-based
      if (todoList[id]) return reply(todoList[id])
      // if the index doesn't exist
      return reply({ message: 'Not found' }).code(404);
    }
  },
  {
    method: 'POST',
    path: '/todo',
    handler: (request, reply) => {
      const todo = request.payload; // request body
      todoList.push(todo);
      return reply({ message: 'created' }).code(201)
    },
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
    handler: (request, reply) => {
      const index = request.params.id - 1;
      todoList[index] = request.payload;
      return reply({ message: 'updated'});
    }
  },
  {
    method: 'PATCH',
    path: '/todo/{id}',
    handler: (request, reply) => {
      const index = request.params.id - 1;
      const todo = todoList[index];
      const patch = request.payload;

      for (let key in patch) {
        if (key in todo) {
          todo[key] = patch[key];

        }
      };

      return reply({ message: 'patched' });
    }
  },
  {
    method: 'DELETE',
    path: '/todo/{id}',
    handler: (request, reply) => {
      const index = request.params.id - 1;
      delete todoList[index];
      return reply({ message: 'deleted' });
    }
  }
];

module.exports = routes;
