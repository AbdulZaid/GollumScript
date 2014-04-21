function Printes(expression) {
  this.expression = expression
}

Printes.prototype.toString = function () {
  return '(printes ' + this.expression + ')'
}

Printes.prototype.analyze = function (context) {
  this.expression.analyze(context)
}

Printes.prototype.optimize = function () {
  this.expression = this.expression.optimize()
  return this
}

module.exports = Printes
