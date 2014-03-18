function Return(expression) {
  this.expression = expression
}

Return.prototype.toString = function () {
  return '(givesUs ' + this.expression.toString() + ')'
}

module.exports = Return;