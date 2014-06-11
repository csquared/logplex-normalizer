var assert = require('assert');
var normalizer = require('../index.js');
var stream = require('stream');
var through = require('through');

suite("normalizer", function(){
  var line     = '256 <158>1 2014-06-11T03:48:40.705145+00:00 host heroku router - at=info method=PUT';
  var expected = 'timestamp=2014-06-11T03:48:40.705145+00:00 host=heroku source=router at=info method=PUT';

  test('converts simple line', function(){
    var actual = normalizer.transform(line);
    assert.equal(expected, actual)
  })

  test('converts stream', function(){
    var s = new stream.PassThrough();
    s.push(line);
    s.push(null);

    s.pipe(normalizer.stream()).pipe(through(function(actual){
      assert.equal(expected + "\n", actual)
    }))
  })

  test('multiple lines', function(){
    var s = new stream.PassThrough();
    s.push(line + "\n");
    s.push(line + "\n");
    s.push(line + "\n");
    s.push(null);

    s.pipe(normalizer.stream()).pipe(through(function(actual){
      assert.equal(expected + "\n", actual)
    }))
  })
})
