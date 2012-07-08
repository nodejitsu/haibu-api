exports.Drone = exports.Client = require('./client/drone').Drone;

exports.createClient = function (options) {
  return {
    drone: new exports.Drone(options)
  };
}
