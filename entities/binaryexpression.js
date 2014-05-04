var Type = require('./type')
var error = require('../error')

function BinaryExpression(op, left, right) {
  this.op = op
  this.left = left
  this.right = right
}

BinaryExpression.prototype.analyze = function (context) {
  this.left.analyze(context)
  this.right.analyze(context)
  op = this.op.lexeme

  if (/<=?|>=?/.test(op)) {
    this.bothOperandsMustBe(Type.NUM)
    this.type = Type.NUM
  } else if (/==|!=/.test(op)) {
    this.left.type.mustBeCompatibleWith(this.right.type, 'Operands of "' + op + '" must have same type', this.op)
    this.type = Type.BOOL
  } else if (/&&|\|\|/.test(op)) {
    this.bothOperandsMustBe(Type.NUM)
    this.type = Type.NUM
  } else {
    // All other binary operators are arithmetic
    this.bothOperandsMustBe(Type.NUM)
    this.type = Type.NUM
  }
}

BinaryExpression.prototype.toString = function () {
  var left = this.left.id? this.left.id.lexeme : this.left
  var right = this.right.id? this.right.id.lexeme : this.right

  return '(' + this.op.lexeme + ' ' + left + ' ' + right + ')'
}

BinaryExpression.prototype.bothOperandsMustBe = function (type) {
  arb = Type.ARBITRARY.name
  if( (type.name != this.left.type || type.name != this.right.type) &&
      (arb != this.left.type.kind  || arb != this.right.type.kind) && (arb != this.left.type.kind)
      &&(arb != this.left.type.kind) ){
    error('Operands to "' + this.op.lexeme + '" must both have type ' + type, this.op)
  }
}

BinaryExpression.prototype.assertCanBeComparedForEquality = function () {

}

module.exports = BinaryExpression