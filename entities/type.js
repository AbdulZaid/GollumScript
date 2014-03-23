var error = require('../error')

var cache = {}

function Type(name) {
  this.name = name
  cache[name] = this
}

Type.prototype.toString = function () {
  return this.name
}

exports.BOOL = Type.BOOL = new Type('Riddle')
exports.NUM = Type.NUM = new Type('Num')
exports.RING = Type.RING = new Type('ring')
exports.FLT = Type.FLT = new Type('Flt')
exports.STR = Type.STR = new Type('Str')
exports.CHR = Type.CHR = new Type('Chr')
exports.ARR = Type.ARR = new Type('Arr')
exports.forName = function (name) {return cache[name]}

Type.prototype.mustBeInteger = function (message, location) {
  if (this !== Type.FLT) {
    error(message, location)
  }
}

Type.prototype.mustBeInteger = function (message, location) {
  if (this !== Type.STR) {
    error(message, location)
  }
}

Type.prototype.mustBeInteger = function (message, location) {
  if (this !== Type.CHR) {
    error(message, location)
  }
}

Type.prototype.mustBeInteger = function (message, location) {
  if (this !== Type.ARR) {
    error(message, location)
  }
}

Type.prototype.mustBeInteger = function (message, location) {
  if (this !== Type.RING) {
    error(message, location)
  }
}

Type.prototype.mustBeInteger = function (message, location) {
  if (this !== Type.RING) {
    error(message, location)
  }
}

Type.prototype.mustBeInteger = function (message, location) {
  if (this !== Type.NUM) {
    error(message, location)
  }
}

Type.prototype.mustBeBoolean = function (message, location) {
  if (this !== Type.BOOL) {
    error(message, location)
  }
}

Type.prototype.isCompatibleWith = function (otherType) {
  // In more sophisticated languages, comapatibility would be more complex
  return this == otherType;  
}

Type.prototype.mustBeCompatibleWith = function (otherType, message, location) {
  if (! this.isCompatibleWith(otherType)) {
    error(message, location)
  }
}
