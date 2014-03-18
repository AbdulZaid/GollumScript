function Return(expression) {
  this.expression = expression
}

ReturnStatement.prototype.toString = function () {
  return '(givesUs ' + this.expression.toString() + ')'
}

module.exports = Return;