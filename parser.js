/*
 * Parser module
 *
 *   var parse = require('./parser')
 *
 *   var program = parse(tokens)
 */

var scanner = require('./scanner')
var error = require('./error')

var Program = require('./entities/program')
var Block = require('./entities/block')
// var Type = require('./entities/type')
// var VariableDeclaration = require('./entities/variabledeclaration')
// var AssignmentStatement = require('./entities/assignmentstatement')
// var ReadStatement = require('./entities/readstatement')
// var WriteStatement = require('./entities/writestatement')
// var WhileStatement = require('./entities/whilestatement')
// var IntegerLiteral = require('./entities/integerliteral')
// var BooleanLiteral = require('./entities/booleanliteral')
// var VariableReference = require('./entities/variablereference')
// var BinaryExpression = require('./entities/binaryexpression')
// var UnaryExpression = require('./entities/unaryexpression')

var tokens

module.exports = function (scannerOutput) {
  tokens = scannerOutput
  var program = parseProgram()
  match('EOF')
  return program
}

function parseScript() {
  //return new Program(parseBlock())
  do {
    parseStatement()
  } while (!at(EOF))
}

function parseBlock() {
  do {
    parseStatement()
  } while (!at('GollumGollum'))
}

function parseStatement() {
  if (at(['Riddle','Num','Str','Chr','<>','[]','ring','makeThing','makeMagic'])) {
    return parseDeclaration()
  } else if (at('ID')) {
    return parseAssignment()
  } else if (at('ifes')) {
    return parseConditional()
  } else if (at('whilees')) {
    return parseWhile()
  } else if (at('revolves')) {
    return parseFor()
  } else if (at('givesUs')) {
    return parseReturn()
  } else if (at('printes')) {
    return parsePrint()
  } else {
    error('Statement expected', tokens[0])
  }
}

function parseDeclaration() {
  if (at(['Riddle','Num','Str','Chr','<>','[]','ring'])) {
    parseVariableDec()
  } else if (at('makeThing')) {
    parseClassDec()
  } else {
    parseFuncDec()
  }
}

function parseType() {
  if (at(['Riddle','Num','Str','Chr','<>','[]', 'ring','it',])) {
    // Eventually: something like return Type.forName(match().lexeme)
  } else {
    error('Type expected', tokens[0])
  }
}

function parseVarDec() {
  parseType()
  match('ID')
  while (at(',')) {
    match(',')
    match('ID')
  }
  match('=')
  parseExp()
  while (at(',')) {
    parseExp()
  }
}

function parseClassDec() {
  match('makeThing')
  match('ID')
  do {
    parseVarDec()
  } while (at([]))
}

function parseFunctDec(){
  match('makeMagic')
  match('ID')
  parseParams()
  parseBlock()
}

function parseParams(){
  match('(')
  parseType()
  match('ID')
  while(at(',')){
    parseType()
  match('ID')
  }
}

function parseAssignmentStatement() {
  // Eventually: something like var target = new VariableReference(match('ID'))
  match('=')
  var source = parseExpression()
  // Eventually: something like return new AssignmentStatement(target, source)
}

function parseReadStatement() {
  match('read')
  var variables = []
  variables.push(new VariableReference(match('ID')))
  while (at(',')) {
    match()
    variables.push(new VariableReference(match('ID')))
  }
  return new ReadStatement(variables)
}

function parseWriteStatement() {
  match('write')
  var expressions = []
  expressions.push(parseExpression())
  while (at(',')) {
    match()
    expressions.push(parseExpression())
  }
  return new WriteStatement(expressions)
}

function parseWhileStatement() {
  match('while')
  var condition = parseExpression()
  match('loop')
  var body = parseBlock()
  match('end')
  return new WhileStatement(condition, body)
}  

function parseExpression() {
  var left = parseExp1()
  while (at('or')) {
    var op = match()
    var right = parseExp1()
    left = new BinaryExpression(op, left, right)
  }
  return left
}

function parseExp1() {
  var left = parseExp2()
  while (at('and')) {
    var op = match()
    var right = parseExp2()
    left = new BinaryExpression(op, left, right)
  }
  return left
}

function parseExp2() {
  var left = parseExp3()
  if (at(['<','<=','==','!=','>=','>'])) {
    var op = match()
    var right = parseExp3()
    left = new BinaryExpression(op, left, right)
  }
  return left
}

function parseExp3() {
  var left = parseExp4()
  while (at(['+','-'])) {
    var op = match()
    var right = parseExp4()
    left = new BinaryExpression(op, left, right)
  }
  return left
}

function parseExp4() {
  var left = parseExp5()
  while (at(['*','/'])) {
    op = match()
    right = parseExp5()
    left = new BinaryExpression(op, left, right)
  }
  return left
}

function parseExp5() {
  if (at(['-','not'])) {
    op = match()
    operand = parseExp6()
    return new UnaryExpression(op, operand)
  } else {
    return parseExp6()
  }
}

function parseExp6() {
  if (at(['true','false'])) {
    return new BooleanLiteral.forName(match().lexeme)
  } else if (at('INTLIT')) {
    return new IntegerLiteral(match())
  } else if (at('ID')) {
    return new VariableReference(match())
  } else if (at('(')) {
    match()
    var expression = parseExpression()
    match(')')
    return expression
  } else {
    error('Illegal start of expression', tokens[0])
  }
}

function at(symbol) {
  if (tokens.length === 0) {
    return false
  } else if (Array.isArray(symbol)) {
    return symbol.some(function (s) {return at(s)})
  } else {
    return symbol === tokens[0].kind
  }  
}

function match(symbol) {
  if (tokens.length === 0) {
    error('Unexpected end of input')
  } else if (symbol === undefined || symbol === tokens[0].kind) {
    return tokens.shift()
  } else {
    error('Expected ' + symbol + ' but found ' + tokens[0].kind, tokens[0])
  }
}
