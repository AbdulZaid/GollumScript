function Whiles(condition, body) {
  this.condition = condition
  this.body = body
}

Whiles.prototype.toString = function () {
  return '(whiles (' + this.condition + ') ' + this.body + ' GollumGollum )'
}

Whiles.prototype.analyze = function (context) {
  this.condition.analyze(context)
  this.condition.type.mustBeBoolean('Condition in "whiles" statement must be boolean')
  this.body.analyze(context)
}

module.exports = Whiles
