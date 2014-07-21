### Tentacle

Tentacle provides a way to orchestrate interactions between
seperate Node processes and check their states at predefined
points.


### API

#### tentacle

```
var tentacle = require('tentacle');
```

The main tentacle module is required within the testing file, 
and is used to fork sub processes. 


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


##### Methods

  * pass
  * fail


### Todo

  * tests