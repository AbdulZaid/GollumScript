function BasicVar (id) {
     this.id = {lexeme:id}
}
BasicVar.prototype.toString = function () {
    return this.id
}

BasicVar.prototype.analyze = function (context) {
    this.referent = context.lookupVariable(this.id)
    this.type = this.referent.type
}

module.exports = BasicVar