var through = require('through');
var split = require('split');
var lineNum = 0;
process.stdin
  .pipe(split())
  .pipe(through(function(line){
    if (0 !== lineNum % 2) {
      line.toUpperCase();
      line = line.toUpperCase();
    } else {
      line = line.toLowerCase();
    }
    this.queue( line + "\n");
    lineNum++;
  }))
  .pipe(process.stdout);
