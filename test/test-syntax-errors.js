var should = require('should')
var scan = require('../scanner')
var parse = require('../parser')
var error = require('../error')

function checkForParseErrors(check, baseFilename) {
  it(check, function (done) {
    scan('test/data/syntax-errors/' + baseFilename + '.gs', function (tokens) {
      var priorErrorCount = error.count
      parse(tokens);
      (error.count-priorErrorCount).should.equal(0)
      done()
    })
  })
}

describe('The parser', function () {

  var checks = {
   // 'detects error at empty program': 'empty',
    'detects errors at start of statement': 'bad-statement',
    'detects unknown types': 'bad-type',
    'detected bad expressions in assignments': 'bad-expr-in-assignment',
    'detects a missing loop keyword': 'missing-loop',
    'detects a missing end keyword': 'missing-end',
    'detects missing commas in printes statements': 'no-comma-in-printes',
    'detects missing commas in givesUs statements': 'no-comma-in-givesUs',
    'detects unbalanced parentheses': 'unbalanced-parens',
    'detects a missing semicolon after a variable declaration': 'no-semicolon',
    'detects multiple relational operators without parentheses': 'multiple-relationals'
  };

  for (var check in checks) {
    if (checks.hasOwnProperty(check)) {
      checkForParseErrors(check, checks[check])
    }
  }
})