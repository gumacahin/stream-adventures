var through = require('through');
var zlib = require('zlib');
var tar = require('tar');
var crypto = require('crypto');
var gzip = zlib.createGunzip();
var parse = tar.Parse();
var decipher = crypto.createDecipher(process.argv[2], process.argv[3]);

parse.on('entry', function(e){
  if (e.type !== 'File') return;
  var hash = crypto.createHash('md5', {encoding: 'hex'});
  e.on('data', function(data) {
    hash.update(data);
  });
  e.on('end', function(data) {
    var digest = hash.digest('hex');
    console.log(digest + ' ' + this.path);
  });
});

process.stdin
  .pipe(decipher)
  .pipe(gzip)
  .pipe(parse);
