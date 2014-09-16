var trumpet = require('trumpet');
var through = require('through');
var tr = trumpet();
var loud = tr.select('.loud').createStream();
var upperCase = function (buf){
  this.queue(buf.toString().toUpperCase());
};

loud.pipe(through(upperCase)).pipe(loud);
process.stdin.pipe(tr).pipe(process.stdout);
