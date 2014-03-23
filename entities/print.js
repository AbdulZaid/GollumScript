function Print(expression) {
  this.expression = expression
}

Print.prototype.toString = function () {
  return '(printes ' + this.expression.toString() + ')'
}

module.exports = Print;