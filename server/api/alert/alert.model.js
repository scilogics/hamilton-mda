'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var AlertSchema = new Schema({
  component: String,
  type: String,
  message: String
});

module.exports = mongoose.model('Alert', AlertSchema);