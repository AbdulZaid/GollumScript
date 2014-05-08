function Ifes(conditions, body, ifElsesBodies,elseBody) {
  this.conditions = conditions
  this.body = body
  this.ifElsesBodies = ifElsesBodies
  this.elseBody = elseBody
}
Ifes.prototype.toString = function () {
  var result = '(ifes '
  result = result.concat(this.conditions[0])
  result = result.concat(this.body)
  for (var i = 1; i < this.conditions.length; i++) {
    result = result.concat(', ifElses ' + this.conditions[i])
    result = result.concat(this.ifElsesBodies[i-1])
  }
  if (this.elseBody) {
    return result + ', elses ' + this.elseBody +' )'
  } else {
    return result + ')'
  }
}

Ifes.prototype.analyze = function (context) {
  this.body.analyze(context)
}

module.exports = Ifes