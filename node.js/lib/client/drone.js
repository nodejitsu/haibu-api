/*
 * drone.js: API Client for the haibu Drone API.
 *
 * (C) 2012, Nodejitsu Inc.
 *
 */

var util = require('util'),
    request = require('request'),
    client = require('./client');

//
// ### function Drone (options)
// #### @options {Object} Options to use for this instance.
// Constructor function for the Client to the Haibu server.
//
var Drone = exports.Drone = function (options) {
  client.Client.call(this, options);
};
util.inherits(Drone, client.Client);

//
// ### function get (name, callback)
// #### @name {string} name of the application to get from the Haibu server.
// #### @callback {function} Continuation to pass control back to when complete.
// Gets the data about all the drones for the app with the specified `name`
// on the remote Haibu server.
//
Drone.prototype.get = function (name, callback) {
  this._request('/drones/' + name, callback, function (res, result) {
    callback(null, result);
  });
};

//
// ### function start (app, callback)
// #### @app {Object} Application to start on the Haibu server.
// #### @callback {function} Continuation to pass control back to when complete.
// Starts the the app with the specified `app.name` on the remote Haibu server.
//
Drone.prototype.start = function (app, callback) {
  this._request({
    method: 'POST',
    path: '/drones/' + app.name + '/start',
    body: { start: app }
  }, callback, function (res, result) {
    callback(null, result);
  });
};

//
// ### function stop (name, callback)
// #### @name {string} Name of the application to stop on the Haibu server.
// #### @callback {function} Continuation to pass control back to when complete.
// Stops the application with the specified `name` on the remote Haibu server.
//
Drone.prototype.stop = function (name, callback) {
  this._request({
    method: 'POST',
    path: '/drones/' + name + '/stop',
    body: { stop: { name: name } }
  }, callback, function (res, result) {
    callback(null, null);
  });
};

//
// ### function restart (name, callback)
// #### @name {string} Name of the application to restart on the Haibu server.
// #### @callback {function} Continuation to pass control back to when complete.
// Restarts the application with the specified :id on the remote Haibu server.
//
Drone.prototype.restart = function (name, callback) {
  this._request({
    method: 'POST',
    path: '/drones/' + name + '/restart',
    body: { restart: { name: name } }
  }, callback, function (res, result) {
    callback(null, result.drones);
  });
};

//
// ### function clean (app, callback)
// #### @app {Object} Application to clean on the Haibu server.
// #### @callback {function} Continuation to pass control back to when complete.
// Attempts to clean the specified `app` from the Haibu server targeted by this instance.
//
Drone.prototype.clean = function (app, callback) {
  this._request({
    method: 'POST',
    path: '/drones/' + app.name + '/clean',
    body: app
  }, callback, function (res, result) {
    callback(null, result);
  });
};

//
// ### function cleanAll (app, callback)
// #### @callback {function} Continuation to pass control back to when complete.
// Attempts to clean the all applications from the Haibu server targeted by this instance.
//
Drone.prototype.cleanAll = function (callback) {
  this._request({
    method: 'POST',
    path: '/drones/cleanall'
  }, callback, function (res) {
    callback();
  });
};
