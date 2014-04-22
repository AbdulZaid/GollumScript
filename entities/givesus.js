function givesUs(expression) {
  this.expression = expression
}

givesUs.prototype.toString = function () {
  return '(givesUs ' + this.expression + ')'
}

givesUs.prototype.analyze = function (context) {
  e.analyze(context)
}

givesUs.prototype.optimize = function () {
  this.expressions = this.expressions.map(function (e) {return e.optimize()})
  return this
}

module.exports = givesUs
