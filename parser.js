/*
 * Parser module
 *
 *   var parse = require('./parser')
 *
 *   var program = parse(tokens)
 */

var scanner = require('./scanner')
var error = require('./error')

var Program = require('./entities/script')
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
var DottedVar = require('./entities/dottedvar')
var BasicVar = require('./entities/basicvar')
var Revolves = require('./entities/revolves')
var IncOp = require('./entities/incop')
var Ifes = require('./entities/ifes')

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

  } while (at(['it','Riddle','Num','Str','Chr','ifes','makeThing','makeMagic','ID','givesUs','printes','revolves'])) 
    return new Block(statements)
}


function parseStatement() {
  if (at(['it','Riddle','Num','Str','Chr','ring','makeThing','makeMagic'])) {
    return parseDeclaration()
  }  else if (at(['++','--'])) {
    return parseIncOp()
  } else if (at('ID')) {
    return parseAssignment()
  } else if (at('ifes')) {
    return parseIfes()
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

function parseVarDec() {
  var type 
  if (at(['Riddle'])) {
    type = match('Riddle')
  } else if (at(['Num'])) {
    type = match('Num')
  } else if (at(['Str'])) {
    type = match('Str')
  } else if (at(['Chr'])) {
    type = match('Chr')
  } else if (at(['it'])) {
    type = match('it')
  }

  var id = match('ID')
  var value
  while (at(',')) {
    match(',')
    parseVarDec()
  }

  if (at('=')) {
    match('=')
    if (at('[')) {
      return parseArrayLit()
    } else {
      value = parseExp()
      while (at(',')) {
        value = parseExp()
      }
    }
  }
  return new VarDec(id, type, value)
}

function parseClassDec() {
  match('makeThing')
  match('ID')
  var body = parseBlock()
  match("GollumGollum")
  return new ClassDec(body)
}

function parseFuncDec() {
  match()
  var name = match('ID').lexeme
  var parameters = parseParamenters()
  var body = parseBlock()
  match('GollumGollum')
  return new FuncDec(name, parameters, body)
}

function parseParamenters() {
  match('(')
  var parameters = []
  if (at('ID')) {
    parameters.push(match('ID').lexeme)
  }
  while (at(',')) {
    match()
    parameters.push(match('ID').lexeme)
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

function parseVar() {
  function gather (base) {
    if (at('.')) {
      return parseDottedVar(base)
    }
  }

  var result = parseBasicVar()
  while (at(['.'])) {
    result = gather(result)
  }
  return result
}

function parseBasicVar () {
  return new BasicVar(match('ID').lexeme)
}

function parseDottedVar (struct) {
  match('.')
  return new DottedVar(struct.name, match('ID').lexeme)
}


function parseAssignment() {
  var target = new VariableReference(match('ID'))
  match('=')
  var source = parseExp()
  return new Assignment(target, source)
}

function parseIfes() {
  var conditions =[]
  var body 
  var ifElsesBodies = []
  var elseBody
  match('ifes')
  conditions.push(parseExp())
  body = parseBlock()
  while (!at('GollumGollum')) {
    if (at('ifElses')){
      match('ifElses')
      conditions.push(parseExp())
      ifElsesBodies.push(parseBlock())
    }else if(at('elses')){
      match('elses')
      elseBody.push(parseBlock())    
    }
  }
  match('GollumGollum')
  return new Ifes(conditions, body, ifElsesBodies,elseBody)
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


//Abdul: Start  working from here next time
function parseFor() {
  match('revolves') 
  match('(')
  var assignments = []
  while(at('it')){
    assignments.push(parseVarDec())
  }
  match(';')
  var condition = parseExp()
  match(';')
  var after = []
  match('ID')
  after.push(parseIncOp())
  match(')')
  var body = parseBlock()
  match('GollumGollum')
  return new Revolves(assignments, condition, after, body)
}

function parseIncOp() {
  var positive
  var target // work on the target and use it inside the intity.
  if (at('++')) {
    positive = true;
    match('++')
    // target = parseVar()
  } else if (at('--')) {
    // target = parseVar()
    match('--')
  }
  return new IncOp( (positive ? "++" : "--") )
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
  while (at(['*','/','%'])) {
    op = match()
    right = parseExp5()
    left = new BinaryExpression(op, left, right)
  }
  return left
}

function parseExp5() {
  if (at(['-','!'])) {
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
  } else if (at('thief')|| at('bless')) {
    return new BooleanLiteral(match())
  } else if (at('ID')) {
    return new parseVar()
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
