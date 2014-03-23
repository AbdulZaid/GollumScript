function WriteStatement(expressions) {
  this.expressions = expressions
}

WriteStatement.prototype.toString = function () {
  return '(givesUs ' + this.expressions.join(' ') + ')'
}

WriteStatement.prototype.analyze = function (context) {
  this.expressions.forEach(function (e) {
    e.analyze(context)
    e.type.mustBeInteger('Expressions in "givesUs" statement must have type integer')
  })
}

module.exports = WriteStatement
