/**
 * GET     /jobs              ->  index
 * POST    /jobs              ->  create
 * GET     /jobs/:id          ->  show
 * PUT     /jobs/:id          ->  update
 * DELETE  /jobs/:id          ->  destroy
 */

'use strict';

var _ = require('lodash');
var Job = require('./job.model');
var open = require('open');


// Get list of jobs
exports.index = function(req, res) {
  initialize();
  Job.find(function (err, jobs) {
    if(err) { return handleError(res, err); }
    return res.status(200).json(jobs);
  });
};

// Get a single job
exports.show = function(req, res) {
  Job.findById(req.params.id, function (err, job) {
    if(err) { return handleError(res, err); }
    if(!job) { return res.status(404).send('Not Found'); }
    return res.json(job);
  });
};

// Creates a new job in the DB.
exports.create = function(req, res) {
  Job.create(req.body, function(err, job) {
    if(err) { return handleError(res, err); }
    return res.status(201).json(job);
  });
};

// Updates an existing job in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Job.findById(req.params.id, function (err, job) {
    if (err) { return handleError(res, err); }
    if(!job) { return res.status(404).send('Not Found'); }
    var updated = _.merge(job, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.status(200).json(job);
    });
  });
};

// Deletes a job from the DB.
exports.destroy = function(req, res) {
  Job.findById(req.params.id, function (err, job) {
    if(err) { return handleError(res, err); }
    if(!job) { return res.status(404).send('Not Found'); }
    job.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.status(204).send('No Content');
    });
  });
};


exports.initialize = function(req, res) {
open('\\192.168.1.125\\C$\\Program Files (x86)\\HAMILTON\\Bin\\HxRun.exe');

};

function handleError(res, err) {
  return res.status(500).send(err);
}