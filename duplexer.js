var spawn = require('child_process').spawn;
var duplexer = require('duplexer');
module.exports = function(cmd, args){
  var command = spawn(cmd, args);
  return duplexer(command.stdin, command.stdout);
};
