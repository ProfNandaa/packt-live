function add(a, b) {
  return a + b;
}

function mul(a, b) {
  return a * b;
}

function div(a, b) {
  return a / b;
}

// arrow functions
const _add = (a, b) => a + b;
const _mul = (a, b) => a * b;
const _div = (a, b) => a / b;

module.exports = {
  add,
  mul,
  div,
};
