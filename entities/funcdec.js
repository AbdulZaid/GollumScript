function FuncDec(name, parameters, body) {
  this.name = name
  this.parameters = parameters
  this.body = body
}

FuncDec.prototype.toString = function () {
  var result = '(FuncDec '+ this.name + ' ('
  if(this.parameters[0]){ 
    result = result.concat(this.parameters[0])
    for (var i = 1; i < this.parameters.length; i++) {
      result = result.concat(', ' + this.parameters[i])
    }
  }
  result = result.concat(') ')
  result = result.concat(this.body + ')')
  return result
}

FuncDec.prototype.analyze = function(context) {
  this.parameters.analyze(context) 
  this.body.analyze(context)
}

module.exports = FuncDec