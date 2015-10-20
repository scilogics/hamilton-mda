/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';

var Device = require('../api/device/device.model');

Device.find({}).remove(function() {
  Device.create({
    name : 'ASM Server',
    //ipAddress : '192.168.1.125',
    status: 'Device Online',
    iconClass: 'text-success',
    icon: 'fa fa-check'
  }, {
    name : 'Rack Runner',
    //ipAddress : '192.168.1.125',
    status: 'Device Offline',
    iconClass: 'text-warning',
    icon: 'fa fa-warning'
  }, {
    name : 'Lab Elite ID Capper',
    //ipAddress : '192.168.1.125',
    status: 'Device Online',
    iconClass: 'text-success',
    icon: 'fa fa-check'
  },  {
    name : 'Hamilton STAR',
    //ipAddress : '192.168.1.125',
    status: 'Device Offline',
    iconClass: 'text-warning',
    icon: 'fa fa-warning'
  });
});


var Job = require('../api/job/job.model');
Job.find({}).remove(function() {
  Job.create({
    batchId: 'Batch001',
    pcrTemplate: 'PCR_Setup001',
    author: 'Neelima Reddy',
    status: 'Completed',
    icon: 'fa fa-check'
  }, {
    batchId: 'Batch002',
    pcrTemplate: 'PCR_Setup002',
    author: 'Neelima Reddy',
    status: 'Completed',
    icon: 'fa fa-check'
  }, {
    batchId: 'Batch003',
    pcrTemplate: 'PCR_Setup003',
    author: 'Justin Villareal',
    status: 'Running',
    icon: 'fa fa-flash'
  }, {
    batchId: 'Batch004',
    pcrTemplate: 'PCR_Setup004',
    author: 'Justin Villareal',
    status: 'Queued',
    icon: 'fa fa-refresh'
  });
});