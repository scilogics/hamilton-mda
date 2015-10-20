'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var DeviceSchema = new Schema({
  name: String,
  ipAddress: String,
  status: String,
  iconClass: String,
  icon: String
});

module.exports = mongoose.model('Device', DeviceSchema);