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

  for(var i = 0; i < this.declaration.length; i++ ){
      this.declaration[i].analyze(context)
  }
  this.condition.analyze(context)
  for(var i = 0; i < this.assignment.length; i++ ){
      this.assignment[i].analyze(context)
  }
  this.body.analyze(context)
}

module.exports = Revolves