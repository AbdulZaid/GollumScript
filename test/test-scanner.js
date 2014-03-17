var should = require('should');
var scan = require('../scanner')
var error = require('../error')
var i = require('util').inspect

describe('The scanner', function () {

  it('scans the simplest program', function (done) {
    scan('test/data/hello.gollum', function (tokens) {
      tokens.length.should.equal(4)
      i(tokens[0]).should.equal(i({kind:'givesUs',lexeme:'givesUs',line:1,col:1}))
      i(tokens[1]).should.equal(i({kind:'INTLIT',lexeme:'0',line:1,col:9}))
      i(tokens[2]).should.equal(i({kind:';',lexeme:';',line:1,col:10}))
      i(tokens[3]).should.equal(i({kind:'EOF',lexeme:'EOF'}))
      done()
    })
  })
  
  it('distinguishes reserved words and identifiers', function (done) {
    scan('test/data/words.gollum', function (tokens) {
      i(tokens[0]).should.equal(i({kind:'ID',lexeme:'whilexy',line:1,col:1}))
      i(tokens[1]).should.equal(i({kind:'whiles',lexeme:'whiles',line:1,col:9}))
      i(tokens[2]).should.equal(i({kind:'ID',lexeme:'whil',line:1,col:16}))
      i(tokens[4]).should.equal(i({kind:'revolves',lexeme:'revolves',line:1,col:27}))
      i(tokens[5]).should.equal(i({kind:'it',lexeme:'it',line:1,col:36}))
      i(tokens[6]).should.equal(i({kind:'ifes',lexeme:'ifes',line:1,col:39}))
      i(tokens[7]).should.equal(i({kind:'ID',lexeme:'ore',line:1,col:44}))
      i(tokens[8]).should.equal(i({kind:':',lexeme:':',line:1,col:48}))
      i(tokens[9]).should.equal(i({kind:'Num',lexeme:'Num',line:1,col:49}))
      i(tokens[11]).should.equal(i({kind:'ID',lexeme:'intbool',line:1,col:53}))
      i(tokens[13]).should.equal(i({kind:'Chr',lexeme:'Chr',line:1,col:61}))
      i(tokens[15]).should.equal(i({kind:'makeThing',lexeme:'makeThing',line:1,col:65}))
      i(tokens[17]).should.equal(i({kind:'printes',lexeme:'printes',line:1,col:75}))
      i(tokens[19]).should.equal(i({kind:'bless',lexeme:'bless',line:1,col:83}))
      i(tokens[21]).should.equal(i({kind:'thief',lexeme:'thief',line:1,col:89}))
      i(tokens[22]).should.equal(i({kind:'revolveTill',lexeme:'revolveTill',line:2,col:1}))
      i(tokens[23]).should.equal(i({kind:'Flt',lexeme:'Flt',line:2,col:13}))
      done()
    })
  })

  it('properly handles comments and blank lines', function (done) {
    scan('test/data/comments-and-blank-lines', function (tokens) {
      tokens.length.should.equal(4)
      i(tokens[0]).should.equal(i({kind:'it',lexeme:'it',line:1,col:1}))
      i(tokens[1]).should.equal(i({kind:'ID',lexeme:'x',line:3,col:3}))
      i(tokens[2]).should.equal(i({kind:';',lexeme:';',line:5,col:7}))
      i(tokens[3]).should.equal(i({kind:'EOF',lexeme:'EOF'}))
      done()
    })
  })

  it('reads symbolic tokens properly', function (done) {
    scan('test/data/symbols', function (tokens) {
      i(tokens[0]).should.equal(i({kind:'<=',lexeme:'<=',line:1,col:1}))
      i(tokens[1]).should.equal(i({kind:'<',lexeme:'<',line:1,col:3}))
      i(tokens[2]).should.equal(i({kind:',',lexeme:',',line:1,col:4}))
      i(tokens[3]).should.equal(i({kind:'==',lexeme:'==',line:1,col:5}))
      i(tokens[4]).should.equal(i({kind:'=',lexeme:'=',line:1,col:7}))
      i(tokens[5]).should.equal(i({kind:'>=',lexeme:'>=',line:1,col:8}))
      i(tokens[6]).should.equal(i({kind:'>',lexeme:'>',line:1,col:10}))
      i(tokens[7]).should.equal(i({kind:'!=',lexeme:'!=',line:1,col:11}))
      i(tokens[8]).should.equal(i({kind:':',lexeme:':',line:1,col:13}))
      i(tokens[9]).should.equal(i({kind:';',lexeme:';',line:1,col:14}))
      i(tokens[10]).should.equal(i({kind:'(',lexeme:'(',line:1,col:15}))
      i(tokens[11]).should.equal(i({kind:')',lexeme:')',line:1,col:16}))
      done()
    })
  })



  it('distinguishes reserved words and identifiers', function (done) {
    scan('test/data/words.gollum', function (tokens) {
     i(tokens[0]).should.equal(i({kind:'ID',lexeme:'whilexy',line:1,col:1}))
     i(tokens[1]).should.equal(i({kind:'whiles',lexeme:'whiles',line:1,col:9}))
     i(tokens[2]).should.equal(i({kind:'ID',lexeme:'whil',line:1,col:16}))
     i(tokens[4]).should.equal(i({kind:'revolves',lexeme:'revolves',line:1,col:27}))
     i(tokens[5]).should.equal(i({kind:'it',lexeme:'it',line:1,col:36}))
     i(tokens[6]).should.equal(i({kind:'ifes',lexeme:'ifes',line:1,col:39}))
     i(tokens[7]).should.equal(i({kind:'ID',lexeme:'ore',line:1,col:44}))
     i(tokens[8]).should.equal(i({kind:':',lexeme:':',line:1,col:48}))
     i(tokens[9]).should.equal(i({kind:'Num',lexeme:'Num',line:1,col:49}))
     i(tokens[11]).should.equal(i({kind:'ID',lexeme:'intbool',line:1,col:53}))
     i(tokens[13]).should.equal(i({kind:'Chr',lexeme:'Chr',line:1,col:61}))
     i(tokens[15]).should.equal(i({kind:'makeThing',lexeme:'makeThing',line:1,col:65}))
     i(tokens[17]).should.equal(i({kind:'printes',lexeme:'printes',line:1,col:75}))
     i(tokens[19]).should.equal(i({kind:'bless',lexeme:'bless',line:1,col:83}))
     i(tokens[21]).should.equal(i({kind:'thief',lexeme:'thief',line:1,col:89}))
     i(tokens[22]).should.equal(i({kind:'revolveTill',lexeme:'revolveTill',line:2,col:1}))
     i(tokens[23]).should.equal(i({kind:'Flt',lexeme:'Flt',line:2,col:13}))
      done()
    })
  })


  it('scans numbers properly', function (done) {
    scan('test/data/numbers', function (tokens) {
      i(tokens[0]).should.equal(i({kind:'ID',lexeme:'loop89x7',line:1,col:1}))
      i(tokens[2]).should.equal(i({kind:'INTLIT',lexeme:'222289',line:1,col:10}))
      i(tokens[3]).should.equal(i({kind:'ID',lexeme:'while9',line:1,col:16}))
      i(tokens[4]).should.equal(i({kind:'INTLIT',lexeme:'02',line:1,col:23}))
      i(tokens[5]).should.equal(i({kind:'INTLIT',lexeme:'1.5',line:1,col:26}))
      done()
    })
  })


  it('detects illegal characters', function (done) {
    scan('test/data/illegal-char', function () {
      error.count.should.equal(0)
      done()
    })})
});

