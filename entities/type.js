var error = require('../error')

var cache = {}

function Type(name) {
  this.name = name
  cache[name] = this
}

Type.BOOL = new Type('Riddle')
Type.NUM = new Type('Num')
Type.RING = new Type('ring')
Type.FLT = new Type('Flt')
Type.STR = new Type('Str')
Type.CHR = new Type('Chr')
Type.ARR = new Type('Arr')
Type.ARBITRARY = new Type('<arbitrary_type>')

Type.prototype.toString = function () {
  return this.name
}

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
  if (this !== Type.NUM) {
    error(message, location)
  }
}

Type.prototype.mustBeBoolean = function (message, location) {
  if (this !== Type.BOOL) {
    error(message, location)
  }
}

Type.prototype.mustBeCompatibleWith = function (otherType, message, location) {
  if (! this.isCompatibleWith(otherType)) {
    error(message, location)
  }
}

Type.prototype.mustBeMutuallyCompatibleWith = function (otherType, message, location) {
  if (! (this.isCompatibleWith(otherType) || otherType.isCompatibleWith(this))) {
    error(message, location)
  }
}

Type.prototype.isCompatibleWith = function (otherType) {
  // In more sophisticated languages, comapatibility would be more complex
  return this === otherType || this === Type.ARBITRARY || otherType === Type.ARBITRARY;  
}

module.exports = {
  BOOL: Type.BOOL,
  NUM: Type.NUM,
  RING: Type.RING,
  ARR: Type.ARR,
  CHR: Type.CHR,
  STR: Type.STR,
  FLT: Type.FLT,
  ARBITRARY: Type.ARBITRARY,
  forName: function (name) {return cache[name]}
}
