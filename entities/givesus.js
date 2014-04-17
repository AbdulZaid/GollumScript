function givesUs(expressions) {
  this.expressions = expressions
}

givesUs.prototype.toString = function () {
  return '(givesUs ' + this.expressions.join(' ') + ')'
}

givesUs.prototype.analyze = function (context) {
  this.expressions.forEach(function (e) {
    e.analyze(context)
    e.type.mustBeInteger('Expressions in "givesUs" statement must have type integer')
  })
}

givesUs.prototype.optimize = function () {
  this.expressions = this.expressions.map(function (e) {return e.optimize()})
  return this
}

module.exports = givesUs