function ArrayDec(array, index) {
  this.array = array
  this.index = index
}

ArrayDec.prototype.toString = function () {
  return '([] ' + this.array + ' ' + this.index + ')'
}

ArrayDec.prototype.analyze = function (context) {
  this.array.analyze(context)
  this.index.analyze(context)
}

module.exports = ArrayDec