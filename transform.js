var through = require('through');
var src = through(function(buf){
  this.queue(buf.toString().toUpperCase());
});
process.stdin.pipe(src).pipe(process.stdout);


