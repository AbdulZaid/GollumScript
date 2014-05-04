var BooleanLiteral = require('./booleanliteral')

function Whiles(condition, body) {
  this.condition = condition
  this.body = body
}

Whiles.prototype.toString = function () {
  return '(whiles ' + this.condition + ' ' + this.body + ')'
}

Whiles.prototype.analyze = function (context) {
  this.condition.analyze(context)
  this.body.analyze(context)
}

Whiles.prototype.optimize = function () {
  this.condition = this.condition.optimize();
  this.body = this.body.optimize();
  if (this.condition instanceof BooleanLiteral && this.condition.value() === false) {
    return null
  }
  return this
}

module.exports = Whiles