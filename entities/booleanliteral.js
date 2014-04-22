var Type = require('./type')

function BooleanLiteral(token) {
  this.token = token
}

BooleanLiteral.prototype.value = function () {
  return this.name === 'true'
}

BooleanLiteral.prototype.toString = function () {
  return this.token.lexeme
}

BooleanLiteral.prototype.analyze = function (context) {
  this.type = Type.BOOL
}

BooleanLiteral.prototype.optimize = function () {
  return this
}

module.exports = BooleanLiteral