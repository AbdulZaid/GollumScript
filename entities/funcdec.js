function FuncDec(funtype, params, body) {
  this.funtype = funtype
  this.params = params
  this.body = body
}

FuncDec.prototype.toString = function () {
  return '(' + this.funtype.lexeme + ' ' + this.params.toString() + ' ' + this.body.toString() + ')'
}

FuncDec.prototype.analyze = function(context) {
  this.params.analyze(context)
  this.body.analyze(context)
}

module.exports = FuncDec