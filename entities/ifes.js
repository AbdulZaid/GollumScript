function Ifes(condition, body) {
  this.condition = condition
  this.body = body
}

Ifes.prototype.toString = function () {
  return '(Ifes ' + this.condition + ' ' + this.body + ')'
}

Ifes.prototype.analyze = function (context) {
  this.condition.analyze(context)
  this.condition.type.mustBeBoolean('Condition in "Ifes" statement must be boolean')
  this.body.analyze(context)
}

module.exports = Ifes