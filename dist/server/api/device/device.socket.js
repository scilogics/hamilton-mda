/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var device = require('./device.model');

exports.register = function(socket) {
  device.schema.post('save', function (doc) {
    onSave(socket, doc);
  });
  device.schema.post('remove', function (doc) {
    onRemove(socket, doc);
  });
}

function onSave(socket, doc, cb) {
  socket.emit('device:save', doc);
}

function onRemove(socket, doc, cb) {
  socket.emit('device:remove', doc);
}