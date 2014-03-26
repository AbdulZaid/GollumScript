function Assignment(target, source) {
  this.target = target
  this.source = source
}

Assignment.prototype.toString = function () {
  return '(= ' + this.target + ' ' + this.source + ')'
}

Assignment.prototype.analyze = function (context) {
  this.target.analyze(context)
  this.source.analyze(context)
  this.source.type.mustBeCompatibleWith(this.target.type, 'Type mismatch in assignment')
}

module.exports = Assignment
