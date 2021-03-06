/*
 * Scanner module
 *
 *   var scan = require('./scanner')
 *
 *   scan(filename, function (tokens) {processTheTokens(tokens)})
 */

var fs = require('fs')
var byline = require('byline')
var error = require('./error')

module.exports = function (filename, callback) {
  var baseStream = fs.createReadStream(filename, {encoding: 'utf8'})
  baseStream.on('error', function (err) {error(err)})

  var stream = byline(baseStream, {keepEmptyLines: true})
  var tokens = []
  var linenumber = 0
  stream.on('readable', function () {
    scan(stream.read(), ++linenumber, tokens)
  })
  stream.once('end', function () {
    tokens.push({kind: 'EOF', lexeme: 'EOF'})
    callback(tokens)
  })
}

function scan(line, linenumber, tokens) {
  if (!line) return

  var start, pos = 0

  function emit(kind, lexeme) {
    tokens.push({kind: kind, lexeme: lexeme || kind, line: linenumber, col: start+1})
  }

  while (true) {
    // Skip spaces
    while (/\s/.test(line[pos])) pos++
    start = pos

    // Nothing on the line
    if (pos >= line.length) break

    // Comment
    // line
    if (line[pos] == '~' && line[pos+1] == '~') break
    // block
    if (line[pos] == '~' && line[pos+1] == '*') {
      var comment = true;
      while(comment){
        comment = !(line[pos] == '*' && line[pos+1] == '~')
        break
      }
    }
    
    // Two-character tokens
    if (/==|!=|\+\+|\-\-|<=|>=|\|\||&&/.test(line.substring(pos, pos+2))) {
      emit(line.substring(pos, pos+2))
      pos += 2

    // One-character tokens
    } else if (/[+\-*\/(),.:;=%<>\[\]]/.test(line[pos])) {
      emit(line[pos++])

    // Reserved words or identifiers
    } else if (/[A-Za-z]/.test(line[pos])) {
      while (/\w/.test(line[pos]) && pos < line.length) pos++
      var word = line.substring(start, pos)
      if (/^(?:Num|Riddle|it|Flt|whiles|revolveTill|Str|Chr|givesUs|revolves|makeThing|makeMagic|ifes|elses|ifElses|bless|thief|printes|forever|thingsInIt|GollumGollum)$/.test(word)) {
        emit(word)
      } else {
        emit('ID', word)
      }
    //String literals
    } else if (/[\"\']/.test(line[pos])) {
      var s = [],
        parenCheck = true,
        emptyString = (line[pos+1] === '\"' || line[pos+1] === '\'')
            //  Line continuation? Someday we might.
            //  old regex, needed improvement + refactor
            //  var stringRegex = /[A-Za-z0-9_,.;:\(\)\!\@\#\$\%\^\&\*\<\>\\\?\x20\'\"]/
            //  implemented /.+/ instead
      while (/.+/.test(line[++pos]) && pos < line.length && parenCheck) {
        //  Checks for escape characters
        //  Link below helped immensely:
        //  http://mathiasbynens.be/notes/javascript-escapes    
        if (line[pos] === '\\') {
          s = s.concat(line[pos])
        if (oneCharEscapeChars.test(line.substring(pos+1, pos+2))) {
          s = s.concat(line.substring(pos+1, pos+2))
          pos++
        } else if (controlEscapeChars.test(line.substring(pos+1, pos+3))) {
          s = s.concat(line.substring(pos+1, pos+3))
          pos += 2
        } else if (hexEscapeCharacters.test(line.substring(pos+1, pos+4))) {
          s = s.concat(line.substring(pos+1, pos+4))
          pos += 3
        } else if (uniEscapeChars.test(line.substring(pos+1, pos+6))) {
          s = s.concat(line.substring(pos+1, pos+6))
          pos += 5
        } else {
          pos++
        }
        } else if (emptyString) {
          parenCheck = false;
          emit('StrLit', "", true)
        } else if (line[pos] === '\"' || line[pos] === '\'') {
          parenCheck = false;
          emit('StrLit', s.join(''))
        } else {
          s = s.concat(line[pos])
        }
      }
    // Numeric literals
    } else if (/\d/.test(line[pos])) {
      while (/\d/.test(line[pos])) pos++
      if(/\./.test(line[pos])){
          pos++
          while(/\d/.test(line[pos])) pos++
       }
       emit('NumLit', line.substring(start, pos))
          
          
    } else {
      error('Illegal character: ' + line[pos], {line: linenumber, col: pos+1})
      pos++
    }
  }
}
