var Type = require('./type')

function IntegerLiteral(value) {
  this.value = value
}

IntegerLiteral.prototype.toString = function () {
  return this.value
}

IntegerLiteral.prototype.analyze = function (context) {
  this.type = Type.NUM
}

IntegerLiteral.prototype.optimize = function () {
  return this
}

module.exports = IntegerLiteral