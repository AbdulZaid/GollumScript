function Printes(expressions) {
  this.expressions = expressions
}

Printes.prototype.toString = function () {
  return '(printes ' + this.expressions.join(' ') + ')'
}

Printes.prototype.analyze = function (context) {
  this.expressions.forEach(function (e) {
    e.analyze(context)
    e.type.mustBeInteger('Expressions in "printes" statement must have type integer')
  })
}

Printes.prototype.optimize = function () {
  this.expressions = this.expressions.map(function (e) {return e.optimize()})
  return this
}

module.exports = Printes