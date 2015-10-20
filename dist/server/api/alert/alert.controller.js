/**
 * GET     /alerts              ->  index
 * POST    /alerts             ->  create
 * DELETE  /alerts/:id          ->  destroy
 */

'use strict';

var _ = require('lodash');
var Alert = require('./alert.model');

// Get list of alerts
exports.index = function(req, res) {
  Alert.find(function (err, alerts) {
    if(err) { return handleError(res, err); }
    return res.status(200).json(alerts);
  });
};

// Creates a new alert in the DB.
exports.create = function(req, res) {
  Alert.create(req.body, function(err, alert) {
    if(err) { return handleError(res, err); }
    return res.status(201).json(alert);
  });
};

// Deletes an alert from the DB.
exports.destroy = function(req, res) {
  Alert.findById(req.params.id, function (err, alert) {
    if(err) { return handleError(res, err); }
    if(!alert) { return res.status(404).send('Alert Not Found'); }
    alert.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.status(204).send('No Content');
    });
  });
};

function handleError(res, err) {
  return res.status(500).send(err);
}