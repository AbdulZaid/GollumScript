function WhileStatement(condition, body) {
  this.condition = condition
  this.body = body
}

WhileStatement.prototype.toString = function () {
  return '(whiles (' + this.condition + ') ' + this.body + ' GollumGollum )'
}

WhileStatement.prototype.analyze = function (context) {
  this.condition.analyze(context)
  this.condition.type.mustBeBoolean('Condition in "while" statement must be boolean')
  this.body.analyze(context)
}

module.exports = WhileStatement
