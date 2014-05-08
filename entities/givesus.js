function givesUs(expression) {
  this.expression = expression
}

givesUs.prototype.toString = function () {
  var expression = this.expression.id? this.expression.id.lexeme : this.expression
  return '(givesUs ' + expression + ')'
}

givesUs.prototype.analyze = function (context) {
  this.expression.analyze(context)
}

givesUs.prototype.optimize = function () {
  this.expression = this.expression.optimize()
  return this
}

module.exports = givesUs
