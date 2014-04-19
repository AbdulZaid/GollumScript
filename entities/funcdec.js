function FuncDec(fntype, params, body) {
  this.fntype = fntype
  this.params = params
  this.body = body
}

FuncDec.prototype.toString = function () {
  return '(' + this.fntype.lexeme + ' ' + this.params.toString() + ' ' + this.body.toString() + ')'
}

FuncDec.prototype.analyze = function(context) {
  this.params.analyze(context)
  this.body.analyze(context)
}

module.exports = FuncDec