function Parameters (parameters) {
  this.parameters = parameters
}

Parameters.prototype.toString = function () {
  return '[' + this.parameters.join(', ') + ']'
}

Parameters.prototype.toArray = function () {
	return this.parameters
}

Parameters.prototype.analyze = function (context) {
	/* If scanned and parsed successfully to this point
	   no analysis will be necessary
	*/
}

module.exports = Parameters