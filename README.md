### Tentacle

Tentacle provides a way to orchestrate interactions between
seperate Node processes and check their states at predefined
points.

Designed for use with a microservice framework like Seneca
or Hapi.

### Syntax

Tentacle uses the EcmaScript 6 Generators syntax to 
reduce the amount of boilerplate around the async 
operations neccessary for communicating between
processes. This helps keep our tests nice and clean.

Therefore tentacle must be run with Node v0.11.x
and upward, or with Node v0.10.x and upward using traceur.

(see Setup)

### API

#### tentacle

```
var tentacle = require('tentacle');
```

The main tentacle module is required within the testing file, 
and is used to fork sub processes. 

```
var child = tentacle('path/to/microservice');
```

##### tentacle#next
The call to `next` returns a sort of event iterator, 
that iterates chronologically over each `sucker` call 
in a child process.

```
test('microservice first state should be successful', function () {
  var child = tentacle('path/to/microservice');
  var process = child.next();

  assert('success', process.state);	
})

```


#### sucker

```
var sucker = require('tentacle/sucker');
```
Or:

```
var sucker = require('tentacle').sucker;
```

The sucker module is required into the processes being
tested, it communicates state back to the main test files. 

`sucker` is a function, we can use it to pass any 
object to a tentacle

```
sucker({pass:'any object'})
```

The convention used by `fail` and `pass` is to
supply an object with state and arguments properties,
so we may want to follow that convention for objects
we pass through sucker. For instance:

```
sucker({state: 'finished'})
```


##### sucker#fail
Call fail to communicate a failing state

Example using seneca: 
```
seneca.act({cmd:'doSomething'}, function (err, args) {
  if (err) { sucker.fail(); return; }
});
```

Theres no need to pass the error through to fail,
the arguments of the callback function are 
picked up by the tentacle sucker and communicated
to the calling process via the state object returned
from tentacle, under the arguments property.


##### sucker#pass

Call pass to communicate a passing state

Example using seneca: 
```
seneca.act({cmd:'doSomething'}, function (err, args) {
  if (err) { sucker.fail(); return; }
  //seems like there's no error so lets pass
  sucker.pass();
});
```



### Setup

#### Node v0.11.x

If using Node v0.11.x or above, ensure that node is 
run with the `--harmony` flag (or at the least, 
the `--harmony-generators` flag).

```
node --harmony mytests.js
```

If you're using a test framework, you'll have to ensure
that it supports a way to pass the harmony flag onto
the node executable. For instance with mocha it would be

```
mocha --harmonly mytest.js
```

#### Node v0.10.x
We are able to run tests on Node v0.10.x (and possibly lower),
with traceur, to do so we must create a bootstrap file,
For example:

```
//mytest-boostrap.js

var traceur = require('traceur');
traceur.require.makeDefault(function(filename) {
  // don't transpile our dependencies, just our app
  return filename.indexOf('node_modules') === -1;
});
require('./mytest.js');

```

Then we would run our test with

```
node mytest-bootstrap.js
```

It may be that our chosen framework has a way
to include traceur transparently, without the need
for a bootstrap file, for instance there's the
mocha-traceur module which allows us to run
our tests using

```
mocha --compilers js:mocha-traceur mytest.js
```





### Todo

  * tests