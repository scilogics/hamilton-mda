'use strict';

var express = require('express');
var controller = require('./alert.controller');

var router = express.Router();

router.get('/', controller.index);
router.post('/', controller.create);
router.delete('/:id', controller.destroy);
router.delete('/device/:id', controller.destroy);

module.exports = router;