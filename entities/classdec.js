var Type = require('./type')

function ClassDec(properties) {
  this.properties = properties
}

ClassDec.prototype.toString = function () {
  return '( ClassDec ' + this.properties.join(', ') + ')'
}

ClassDec.prototype.analyze = function (context) {
  this.type = Type.OBJLIT
}

module.exports = ClassDec