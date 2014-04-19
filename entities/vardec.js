var Type = require('./type')

function VarDec(id, type) {
  this.id = id
  this.type = type
}

VarDec.prototype.toString = function () {
  return '(Var :' + this.id.lexeme + ' ' + this.type + ')'
}

VarDec.prototype.analyze = function (context) {
  context.variableMustNotBeAlreadyDeclared(this.id)
  context.addVariable(this.id.lexeme, this)
}

VarDec.ARBITRARY = new VarDec('<arbitrary>', Type.ARBITRARY)

module.exports = VarDec