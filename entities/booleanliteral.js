var Type = require('./type')

var cache = {}

function BooleanLiteral(token) {
  this.token = token
}

BooleanLiteral.prototype.toString = function () {
  return this.token.lexeme;
}

BooleanLiteral.prototype.analyze = function (context) {
  this.type = Type.BOOL
}

module.exports = BooleanLiteral

