var fork = require('co-fork');
var forkOpts = {
  silent: true,
  env: {test: true}
};
function tentacle(path) {
  var proc = fork(path, forkOpts);
  proc = proc.once.bind(proc, 'message');
  proc.next = proc;
  return proc;
}
module.exports = tentacle;
