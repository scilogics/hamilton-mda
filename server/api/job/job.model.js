'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var JobSchema = new Schema({
  batchId: String,
  pcrTemplate: String,
  author: String,
  status: String,
  icon: String
});

module.exports = mongoose.model('Job', JobSchema);