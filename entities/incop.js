function IncOp(symbol, IncOp) {
  this.symbol = symbol
  this.IncOp = IncOp
}
IncOp.prototype.toString = function () {
  return '( ' + this.IncOp +' '+ this.symbol +   ' )'
}

IncOp.prototype.analyze = function (context) {
    this.referent = context.lookupVariable(this.symbol)
}

module.exports = IncOp