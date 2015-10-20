/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var job = require('./job.model');

exports.register = function(socket) {
  job.schema.post('save', function (doc) {
    onSave(socket, doc);
  });
  job.schema.post('remove', function (doc) {
    onRemove(socket, doc);
  });
}

function onSave(socket, doc, cb) {
  socket.emit('job:save', doc);
}

function onRemove(socket, doc, cb) {
  socket.emit('job:remove', doc);
}