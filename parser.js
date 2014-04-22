/*
 * Parser module
 *
 *   var parse = require('./parser')
 *
 *   var program = parse(tokens)
 */

var scanner = require('./scanner')
var error = require('./error')

var Program = require('./entities/script')//script
var Block = require('./entities/block')
var Type = require('./entities/type')
var Assignment = require('./entities/assignment')
var Whiles = require('./entities/whiles')
var IntegerLiteral = require('./entities/integerliteral')
var StringLiteral = require('./entities/stringliteral')
var BooleanLiteral = require('./entities/booleanliteral')
var ArrayLiteral = require('./entities/arrayliteral')
var VarDec = require ('./entities/vardec')
var VariableReference = require('./entities/variablereference')
var BinaryExpression = require('./entities/binaryexpression')
var UnaryExpression = require('./entities/unaryexpression')
var GivesUs = require('./entities/givesus')
var Printes = require('./entities/printes')
var ClassDec = require('./entities/classdec')
var FuncDec = require('./entities/funcdec')
var Paramenters = require('./entities/parameters')
var tokens

module.exports = function (scannerOutput) {
  tokens = scannerOutput
  var script = parseScript()
  match('EOF')
  return script
}

function parseScript() {
  return new Program(parseBlock())
}

function parseBlock() {
  var statements = []
  do {

    statements.push(parseStatement())

  } while (at(['it','Riddle','Num','Str','Chr','ifes','makeThing','makeMagic','ID','givesUs','printes'])) 
    return new Block(statements)
}


function parseStatement() {
  if (at(['it','Riddle','Num','Str','Chr','ring','makeThing','makeMagic'])) {
    return parseDeclaration()
  } else if (at('ID')) {
    return parseAssignment()
  } else if (at('ifes')) {
    return parseConditional()
  } else if (at('whiles')) {
    return parseWhile()
  } else if (at('revolves')) {
    return parseFor()
  } else if (at('givesUs')) {
    return parseGivesUs()
  } else if (at('printes')) {
    return parsePrint()
  } else {
    error('Statement expected', tokens[0])
  }
}

function parseDeclaration() {
  if (at(['it','Riddle','Num','Str','Chr'])) {
    return parseVarDec()
  } else if (at('makeThing')) {
    return parseClassDec()
  } else if (at('makeMagic')){
    return parseFuncDec()
  }
}

function parseType() {
  if (at(['Riddle','Num','Str','Chr','it'])) { //Type should be followed by an optional '[]' for arrays
    return Type.forName(match().lexeme)
  } else {
    error('Type expected', tokens[0])
  }
}

function parseVarDec() {
  var type = parseType()
  var id = match('ID')

  while (at(',')) {
  match(',')
    parseVarDec()
  }
  if (at('=')) {
    match('=')
    if (at('[')) {
    return parseArrayLit()
    } else {
      parseExp()
      while (at(',')) {
        parseExp()
      }
    }
  }
  return new VarDec(id,type)
}

function parseClassDec() {
  match('makeThing')
  match('ID')
  do {
    parseVarDec()
  } while (!at('GollumGollum'))
}

function parseFuncDec() {
  var funtype = match()
  match('ID')
  var parameters = parseParamenters()
  var body = parseBlock()
  match('GollumGollum')
  return new FuncDec(funtype, parameters, body)
}

function parseParamenters() {
  match('(')
  var parameters = []
  if (at('ID')) {
    parameters.push(match('ID'))
  }
  while (at(',')) {
    match()
    parameters.push(match('ID'))
  }
  match(')')
  return new Paramenters(parameters)
}

function parseArrayLit() {
  var elements = []
  match('[')
  if (!at(']')) {
    elements.push(parseExp6())
  }
  while (at(',')) {
    match()
    elements.push(parseExp6())
  }
  match(']')
  return new ArrayLiteral(elements)
}

function parseAssignment() {
  var target = new VariableReference(match('ID'))
  match('=')
  var source = parseExp()
  return new Assignment(target, source)
}

function parseConditional() {
  match('ifes')
  var condition = parseExpression()
  var body = parseBlock()
  return new Conditional(condition, body)
  while (at('ifElses')) {
    var condition = parseExpression()
    var body = parseBlock()
    return new Conditional(condition, body)
  }
  if (at('elses')) {
    var condition = null
    var body = parseBlock()
    return new Conditional(condition, body)
  }
}

function parseWhile() {
  match('whiles') 
  match('(')
  var condition = parseExp()
  match(')')
  var body = parseBlock()

  match('GollumGollum')
  return new Whiles(condition, body)
}


//Calos: Start  working from here next time
function parseFor() {
  match('revolves')
  match('(')
  while(at('it')){
    var variables = parseVarDec()
  }
  match(';')
  var condition = parseExp()
  match(';')
  match('ID')
  // Eventually: var incremment = parseIncOp()
  match(')')
  var body = parseBlock()
  match('GollumGollum')
  // Eventually: something like return new ForStatement(condition, body)
}  
 
function parseGivesUs() {
  match('givesUs')
  return new GivesUs(parseExp())
}

function parsePrint() {
  match('printes')
  var expression = parseExp()
  return new Printes(expression)
}

function parseExp() {
  var left = parseExp1()
  while (at('||')) {
    var op = match()
    var right = parseExp1()
    left = new BinaryExpression(op, left, right)
  }
  return left
}

function parseExp1() {
  var left = parseExp2()
  while (at('&&')) {
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
  if (at(['bless','thief'])) {
    return new BooleanLiteral(match())
  } else if (at('NumLit')) {
    return new IntegerLiteral(match().lexeme)
  } else if (at('StrLit')) {
    return new StringLiteral(match())
  } else if (at('thief')||at('bless')) {
    return new BooleanLiteral(match())
  } else if (at('ID')) {
    return new VariableReference(match())
  } else if (at('[')) {
    return parseArrayLit()
  } else if (at('(')) {
    match()
    var expression = parseExp()
    match(')')
    return expression
  } else {
    error( 'Illegal start of expression', tokens[0])
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
