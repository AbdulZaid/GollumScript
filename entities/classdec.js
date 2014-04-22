var Type = require('./type')

function ClassDec(properties) {
  this.properties = properties
}

ClassDec.prototype.toString = function () {
  return '( ClassDec ' + this.properties.toString() + ')'
}

ClassDec.prototype.analyze = function (context) {
  this.properties.analyze(context)
}

module.exports = ClassDec