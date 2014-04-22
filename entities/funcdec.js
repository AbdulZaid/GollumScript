function FuncDec(name, parameters, body) {
  this.name = name
  this.parameters = parameters
  this.body = body
}

FuncDec.prototype.toString = function () {
  return '(' + this.name + ' ' + this.parameters + ' ' + this.body + ')'
}

FuncDec.prototype.analyze = function(context) {
  // TODO: ADD THE FUNCTION TO THE CONTEXT
  this.parameters.analyze(context) // TODO add these too (maybe you already did)
  this.body.analyze(context)
}

module.exports = FuncDec