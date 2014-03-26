function Ifes(condition, body) {
  this.condition = condition
  this.body = body
}

ForStatement.prototype.toString = function () {
  return '(Ifes ' + this.condition + ' ' + this.body + ')'
}

WhileStatement.prototype.analyze = function (context) {
  this.condition.analyze(context)
  this.condition.type.mustBeBoolean('Condition in "Ifes" statement must be boolean')
  this.body.analyze(context)
}

module.exports = Ifes