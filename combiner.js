var split = require('split');
var through = require('through');
var zlib = require('zlib');
var name;
var books = [];

function collect(buf) {
  if ('' === buf) return;
  var obj = JSON.parse(buf);
  if (obj.type === 'genre') {
    if (books.length) {
      this.queue(JSON.stringify({name: name, books: books}) + "\n");
      books = [];
    }
    name = obj.name;
  } else if (obj.type === 'book') {
    books.push(obj.name);
  }
}

function cleanup(){
  if (books.length) {
    this.queue(JSON.stringify({name: name, books: books}) + "\n");
  }
  this.queue(null);
}

module.exports = function(){
  var combine = require('stream-combiner');
  return combine(
      split(),
      through(collect, cleanup),
      zlib.createGzip()
  );
};
