function IfStatement(condition, body) {
  this.condition = condition
  this.body = body
}

ForStatement.prototype.toString = function () {
  return '(If ' + this.condition + ' ' + this.body + ')'
}

WhileStatement.prototype.analyze = function (context) {
  this.condition.analyze(context)
  this.condition.type.mustBeBoolean('Condition in "if" statement must be boolean')
  this.body.analyze(context)
}

module.exports = IfStatement