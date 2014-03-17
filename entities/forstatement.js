function ForStatement(condition, body) {
  this.condition = condition
  this.body = body
}

ForStatement.prototype.toString = function () {
  return '(For ' + this.condition + ' ' + this.body + ')'
}

WhileStatement.prototype.analyze = function (context) {
  this.condition.analyze(context)
  this.condition.type.mustBeBoolean('Condition in "for" statement must be boolean')
  this.body.analyze(context)
}

module.exports = ForStatement