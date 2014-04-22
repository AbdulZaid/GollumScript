function IncOp(symbol) {
  this.symbol = symbol
}

IncOp.prototype.toString = function () {
  return '( ' + this.symbol + ' ' +  ')'
}

IncOp.prototype.analyze = function (context) {
  context.lookupVariable(this.symbol)
}

module.exports = IncOp