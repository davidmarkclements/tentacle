'use strict'

function noop() {}

if (!(process.send instanceof Function)) {
  noop.fail = noop;
  noop.pass = noop;
  noop.attach = noop;
  module.exports = noop;
  return;
}
  
function sucker(msg) {
  process.send(msg);
}

sucker.SUCCESS = 'success';
sucker.FAILURE = 'failure';
sucker.ATTACHED = 'attached';

sucker.fail = function fail () {
  sucker({state: sucker.FAILURE, arguments: fail.caller.arguments});
}

sucker.pass = function pass () {
  sucker({state: sucker.SUCCESS, arguments: pass.caller.arguments});
}

sucker.attach = function () {
  sucker({state: sucker.ATTACHED});
}

module.exports = sucker;