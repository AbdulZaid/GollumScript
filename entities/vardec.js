var Type = require('./type')

function VarDec(id, type, value) {
 console.log(id)
  this.id = id
  this.type = type
  this.value = value
}

VarDec.prototype.toString = function () {
  return '(' + this.type.lexeme + ' ' + this.id +' '+this.value + ')'
}

VarDec.prototype.analyze = function (context) {
  context.variableMustNotBeAlreadyDeclared(this.id)
  context.addVariable(this.id.lexeme, this)
}

VarDec.ARBITRARY = new VarDec('<arbitrary>', Type.ARBITRARY)

module.exports = VarDec