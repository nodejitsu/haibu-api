# haibu-api (node.js)

The `node.js` client for the [haibu](http://github.com/nodejitsu/haibu) API.

## Usage

Allows you to call haibu programmatically from inside your node.js scripts.

```javascript
var eyes = require('eyes'),
    haibu = require('haibu');

// Create a new client for communicating with the haibu server
var client = new haibu.drone.Client({
  host: 'localhost',
  port: 9002
});

// A basic package.json for a node.js application on haibu
var app = {
  "user": "marak",
  "name": "test",
  "domain": "devjitsu.com",
  "repository": {
    "type": "git",
    "url": "https://github.com/Marak/hellonode.git",
  },
  "scripts": {
    "start": "server.js"
  }
};

// Attempt to start up a new application
client.start(app, function (err, result) {
  if (err) {
    console.log('Error spawning app: ' + app.name);
    return eyes.inspect(err);
  }

  console.log('Successfully spawned app:');
  eyes.inspect(result);
});


client.start(app, function (err, result) {
  eyes.inspect(err);
  eyes.inspect(result);
});
```

## Run Tests
All of the `haibu` tests are written in [vows][0], and cover all of the use cases described above.

``` bash
  $ npm test
```

#### License: MIT
#### Author: [Nodejitsu Inc](http://nodejitsu.com)
#### Contributors: [Maciej Malecki](http://github.com/mmalecki), [Charlie Robbins](http://github.com/indexzero)