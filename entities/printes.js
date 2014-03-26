function Printes(expression) {
  this.expression = expression
}

Printes.prototype.toString = function () {
  return '(printes ' + this.expression.toString() + ')'
}

module.exports = Printes;