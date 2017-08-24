var testData = require('./testData');
var Util = require('./../src/util');

describe("Convert Currency string to Number Value", function() {
  it("'glob, prok' should be 4", function(done) {
      var value = Util.ConvertCurrencyToValue([ 'glob', 'prok' ], testData.currNum, testData.unitNum, testData.romanNumeralsVal);
      expect(value).toBe(4);
      done();
  });
  it("'pish, glob, prok' should be 14", function(done) {
      var value = Util.ConvertCurrencyToValue([ 'pish', 'glob', 'prok' ], testData.currNum, testData.unitNum, testData.romanNumeralsVal);
      expect(value).toBe(14);
      done();
  });
});
