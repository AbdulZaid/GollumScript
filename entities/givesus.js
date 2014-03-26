function GivesUs(expression) {
  this.expression = expression
}

GivesUs.prototype.toString = function () {
  return '(givesUs ' + this.expression.toString() + ')'
}

module.exports = GivesUs;