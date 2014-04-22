function Revolves(declaration, condition, assignment, body) {
  this.declaration = declaration
  this.condition = condition
  this.assignment = assignment
  this.body = body 
}

Revolves.prototype.toString = function () {
  return '(Revolves ' + this.declaration +  this.condition + this.assignment + ' ' + this.body + ')'
}

Revolves.prototype.analyze = function (context) {
  this.declaration.analyze(context)
  this.condition.analyze(context)
  this.assignment.analyze(context)
  this.body.analyze(context)
}

module.exports = Revolves