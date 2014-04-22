function FuncDec(funtype, params, body) {
  this.funtype = funtype
  this.parameters = params
  this.body = body
}

FuncDec.prototype.toString = function () {
  return '(' + this.funtype.lexeme + ' ' + this.parameters.toString() + ' ' + this.body.toString() + ')'
}

FuncDec.prototype.analyze = function(context) {
  this.params.analyze(context)
  this.body.analyze(context)
}

module.exports = FuncDec