function DottedVar(struct, property) {
	this.struct = struct
	this.property = property
}

DottedVar.prototype.toString = function () {
	return '(' + this.struct + ' ' + this.property + ')'
}

DottedVar.prototype.analyze = function (context) {
	this.struct.analyze(context)
	this.property.analyze(context)
  	this.type = this.struct.type
	//this.type.mustBeObject("Must be an Object")
}

module.exports = DottedVar