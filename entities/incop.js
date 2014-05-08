function IncOp(id, IncOp) {
  this.id = id
  this.IncOp = IncOp
}
IncOp.prototype.toString = function () {
  return '( ' + this.IncOp +' '+ this.id.lexeme +   ' )'
}

IncOp.prototype.analyze = function (context) {
    this.referent = context.lookupVariable(this.id)
    //console.log(this);
}

module.exports = IncOp