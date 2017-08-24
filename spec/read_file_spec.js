var testData = require('./testData');
var AppEntry = require('./../app');

describe("Read file", function() {
  it("input file is readable", function(done) {
      expect(AppEntry.Reader.input.readable).toBe(true);
      done();
  });
});
