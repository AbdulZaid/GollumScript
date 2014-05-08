var VariableReference = require('./variablereference')

function Assignment(target, source) {
  this.target = target
  this.source = source
}

Assignment.prototype.toString = function () {
  return '(= ' + this.target + ' ' + this.source.lexem + ')'
}

Assignment.prototype.analyze = function (context) {
  this.target.analyze(context)
  this.source.analyze(context)
  //this.source.type.mustBeCompatibleWith(this.target.type, 'Type mismatch in assignment')
}

Assignment.prototype.optimize = function () {
  this.target = this.target.optimize()
  this.source = this.source.optimize()
  if (this.source instanceof VariableReference &&  this.target.referent === this.source.referent) {
    return null
  }
  return this
}

module.exports = Assignment