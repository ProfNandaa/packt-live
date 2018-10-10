const jwt = require('jsonwebtoken');
const Joi = require('joi');
const md5 = require('md5');

const Knex = require('../db');

async function auth(request, reply) {
  const { email, password } = request.payload;
  const [ user ] = await Knex('user')
    .where('email', email);
  
  if (!user) return reply({ message: 'user not found'}).code(404);

  if (user.password === md5(password)) {
    // email and password match!
    // return token to the user
    const payload = {
      name: user.name,
      email: user.email,
      id: user.id,
    };
    const secretKey = 'my-secret-key';
    const algo = {
      algorithm: 'HS256',
      expiresIn: '120d' // 120 days => ~4 months
    };
    const token = jwt.sign(payload, secretKey, algo);
    return reply({ token, uid: user.id });
  }
  // else
  return reply({ message: 'incorrect password' }).code(400);
}

module.exports = {
  method: 'POST',
  path: '/auth',
  handler: auth,
  config: {
    validate: {
      payload: {
        email: Joi.string().email().required(),
        password: Joi.string().required(),
      }
    }
  }
}