function VarDec(id, type) {
  this.id = id
  this.type = type
}

VarDec.prototype.toString = function () {
  return '(VarDec : ' + this.id.lexeme + ' ' + this.type + ')'
}

VarDec.prototype.analyze = function (context) {
  context.variableMustNotBeAlreadyDeclared(this.id)
  context.addVariable(this.id.lexeme, this)
}

module.exports = VarDec
