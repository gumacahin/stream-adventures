var duplexer = require('duplexer');
var through = require('through');
module.exports = function(counter){
  var countryCount = {};
  var input = through(function(buf){
    if (countryCount[buf.country]) {
      countryCount[buf.country]++;
    } else {
      countryCount[buf.country] = 1;
    }
    this.queue(buf);
  },
  function(buf){
    counter.setCounts(countryCount);
  });
  return duplexer(input, counter);
};
