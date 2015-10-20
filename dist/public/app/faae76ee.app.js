"use strict";function MainCtrl(a,b){var c=992;a.getWidth=function(){return window.innerWidth},a.$watch(a.getWidth,function(d,e){d>=c?angular.isDefined(b.get("toggle"))?a.toggle=b.get("toggle")?!0:!1:a.toggle=!0:a.toggle=!1}),a.toggleSidebar=function(){a.toggle=!a.toggle,b.put("toggle",a.toggle)},window.onresize=function(){a.$apply()}}function rdLoading(){var a={restrict:"AE",template:'<div class="loading"><div class="double-bounce1"></div><div class="double-bounce2"></div></div>'};return a}function pltLayout(){var a={transclude:!0,template:'<div class="grid col-lg-6 col-md-6 col-sm-6" ng-transclude></div>',restrict:"EA"};return a}function rdWidgetBody(){var a={requires:"^rdWidget",scope:{loading:"@?",classes:"@?"},transclude:!0,template:'<div class="widget-body" ng-class="classes"><rd-loading ng-show="loading"></rd-loading><div ng-hide="loading" class="widget-content" ng-transclude></div></div>',restrict:"EA"};return a}function rdWidgetFooter(){var a={requires:"^rdWidget",transclude:!0,template:'<div class="widget-footer" ng-transclude></div>',restrict:"E"};return a}function rdWidgetTitle(){var a={requires:"^rdWidget",scope:{title:"@",icon:"@"},transclude:!0,template:'<div class="widget-header"><div class="row"><div class="pull-left"><i class="fa" ng-class="icon"></i> {{title}} </div><div class="pull-right col-xs-6 col-sm-4" ng-transclude></div></div></div>',restrict:"E"};return a}function rdWidget(){var a={transclude:!0,template:'<div class="widget" ng-transclude></div>',restrict:"EA"};return a}angular.module("hamiltonApp",["ngCookies","ngResource","ngSanitize","btford.socket-io","ui.router","ui.bootstrap"]).config(["$stateProvider","$urlRouterProvider","$locationProvider",function(a,b,c){b.otherwise("/"),a.state("index",{url:"/",templateUrl:"app/templates/dashboard.html"}).state("assays",{url:"/assays",templateUrl:"app/templates/assays.html"}).state("jobs",{url:"/jobs",templateUrl:"app/templates/jobs.html"}).state("reports",{url:"/reports",templateUrl:"app/templates/reports.html"})}]),angular.module("hamiltonApp").controller("AlertsCtrl",["$scope","$http","$log","socket",function(a,b,c,d){a.alerts=[],b.get("/api/alerts").success(function(b){c.log("Getting Alerts"),a.alerts=b,d.syncUpdates("alert",a.alerts)}),a.addAlert=function(a){b.post("api/alerts",a),c.log("Alert Added!")},a.deleteAlert=function(a){b["delete"]("/api/alerts/"+a._id)},a.deleteDeviceAlert=function(a){b["delete"]("/api/alerts/device/"+a._id)},a.closeAlert=function(b){a.alerts.splice(b,1)},a.$on("$destroy",function(){d.unsyncUpdates("alert")})}]),angular.module("hamiltonApp").controller("AssayCtrl",["$scope",function(a){a.message="Hello"}]),angular.module("hamiltonApp").controller("DeviceCtrl",["$controller","$scope","$http","$log","socket",function(a,b,c,d,e){a("AlertsCtrl",{$scope:b});c.get("/api/devices").success(function(a){d.log("Getting Device Status");for(var c=0;c<a.length;c++){var f=a[c];"Device Offline"==f.status&&b.addAlert({component:"device",type:"danger",message:f.name+" is not connected.  Make sure device is turned on."})}b.devices=a,e.syncUpdates("device",b.devices)}),b.clearDeviceAlerts=function(){for(var a=0;a<b.alerts.length;a++){var c=b.alerts[a];b.deleteDeviceAlert(c)}},b.Initialize=function(){d.log("Initializing Devices"),b.clearDeviceAlerts();for(var a=0;a<b.devices.length;a++){var e=b.devices[a];c.put("/api/devices/"+e._id,{status:"Device Online",iconClass:"text-success",icon:"fa fa-check"})}b.addAlert({component:"device",type:"success",message:"Systems are online!"}),d.log("Initialization Complete")},b.Deinitialize=function(){d.log("Deinitializing Devices"),b.clearDeviceAlerts();for(var a=0;a<b.devices.length;a++){var e=b.devices[a];c.put("/api/devices/"+e._id,{status:"Device Offline",iconClass:"text-warning",icon:"fa fa-warning"}),b.addAlert({component:"device",type:"danger",message:e.name+" is not connected.  Make sure device is turned on."})}d.log("Initialization Complete")}}]),angular.module("hamiltonApp").controller("HeaderbarCtrl",["$scope","$http",function(a,b){a.header="Hello",a.breadcrumb="Home / "+a.header}]),angular.module("hamiltonApp").controller("JobCtrl",["$scope","$http","$log","Modal","socket",function(a,b,c,d,e){b.get("/api/jobs").success(function(b){c.log("Getting Jobs"),a.jobs=b,e.syncUpdates("jobs",a.jobs)}),a.clearDeviceAlerts=function(){for(var b=0;b<a.alerts.length;b++){var c=a.alerts[b];a.deleteDeviceAlert(c)}},a["delete"]=d.confirm["delete"](function(){})}]),angular.module("hamiltonApp").controller("MainCtrl",["$scope","$cookieStore",MainCtrl]),angular.module("hamiltonApp").controller("PlateCtrl",["$scope",function(a){for(var b=0,c=0,d='<div class="box" />',e=0;8>e;e++)for(var f=0;12>f;f++)$("#grid").append(d);$(".box").on("click",function(){b=$(this).position().left,c=$(this).position().top,$(this).text("Sample="+b+" , Y="+c)})}]),angular.module("hamiltonApp").directive("rdLoading",rdLoading),angular.module("hamiltonApp").directive("pltLayout",pltLayout),angular.module("hamiltonApp").directive("rdWidgetBody",rdWidgetBody),angular.module("hamiltonApp").directive("rdWidgetFooter",rdWidgetFooter),angular.module("hamiltonApp").directive("rdWidgetHeader",rdWidgetTitle),angular.module("hamiltonApp").directive("rdWidget",rdWidget),angular.module("hamiltonApp").factory("Modal",["$rootScope","$modal",function(a,b){function c(c,d){var e=a.$new();return c=c||{},d=d||"modal-default",angular.extend(e,c),b.open({templateUrl:"components/modal/modal.html",windowClass:d,scope:e})}return{confirm:{"delete":function(a){return a=a||angular.noop,function(){var b,d=Array.prototype.slice.call(arguments),e=d.shift();b=c({modal:{dismissable:!0,title:"Confirm Delete",html:"<p>Are you sure you want to delete <strong>"+e+"</strong> ?</p>",buttons:[{classes:"btn-danger",text:"Delete",click:function(a){b.close(a)}},{classes:"btn-default",text:"Cancel",click:function(a){b.dismiss(a)}}]}},"modal-danger"),b.result.then(function(b){a.apply(b,d)})}}}}}]),angular.module("hamiltonApp").factory("socket",["socketFactory",function(a){var b=io("",{path:"/socket.io-client"}),c=a({ioSocket:b});return{socket:c,syncUpdates:function(a,b,d){d=d||angular.noop,c.on(a+":save",function(a){var c=_.find(b,{_id:a._id}),e=b.indexOf(c),f="created";c?(b.splice(e,1,a),f="updated"):b.push(a),d(f,a,b)}),c.on(a+":remove",function(a){var c="deleted";_.remove(b,{_id:a._id}),d(c,a,b)})},unsyncUpdates:function(a){c.removeAllListeners(a+":save"),c.removeAllListeners(a+":remove")}}}]),angular.module("hamiltonApp").run(["$templateCache",function(a){a.put("app/templates/assays.html",'COMING SOON<!--\n<div class=row><div class=col-lg-6><rd-widget><rd-widget-header icon=fa-tasks title=Servers><a href=#>Manage</a></rd-widget-header><rd-widget-body classes="medium no-padding"><div class=table-responsive><table class=table><tbody><tr><td>RDVMPC001</td><td>238.103.133.37</td><td><span class=text-success><i class="fa fa-check"></i></span></td></tr><tr><td>RDVMPC002</td><td>68.66.63.170</td><td><span class=text-success><i class="fa fa-check"></i></span></td></tr><tr><td>RDVMPC003</td><td>76.117.212.33</td><td><span tooltip="Server Down!" class=text-danger><i class="fa fa-warning"></i></span></td></tr><tr><td>RDPHPC001</td><td>91.88.224.5</td><td><span class=text-success><i class="fa fa-check"></i></span></td></tr><tr><td>RDESX001</td><td>197.188.15.93</td><td><span class=text-success><i class="fa fa-check"></i></span></td></tr><tr><td>RDESX002</td><td>168.85.154.251</td><td><span class=text-success><i class="fa fa-check"></i></span></td></tr><tr><td>RDESX003</td><td>209.25.191.61</td><td><span tooltip="Server Down!" class=text-danger><i class="fa fa-warning"></i></span></td></tr><tr><td>RDESX004</td><td>252.37.192.235</td><td><span class=text-success><i class="fa fa-check"></i></span></td></tr><tr><td>RDTerminal01</td><td>139.71.18.207</td><td><span class=text-success><i class="fa fa-check"></i></span></td></tr><tr><td>RDTerminal02</td><td>136.80.122.212</td><td><span tooltip="Could not connect!" class=text-warning><i class="fa fa-flash"></i></span></td></tr><tr><td>RDDomainCont01</td><td>196.80.245.33</td><td><span class=text-success><i class="fa fa-check"></i></span></td></tr></tbody></table></div></rd-widget-body><rd-widget-footer><ul class="pagination pagination-sm pull-right"><li><a href=#>&laquo;</a></li><li><a href=#>1</a></li><li><a href=#>2</a></li><li><a href=#>3</a></li><li><a href=#>4</a></li><li><a href=#>5</a></li><li><a href=#>&raquo;</a></li></ul><div class=clearfix></div></rd-widget-footer></rd-widget></div><div class=col-lg-6><rd-widget><rd-widget-header icon=fa-tasks title="Striped Servers"><a href=#>Manage</a></rd-widget-header><rd-widget-body classes="medium no-padding"><div class=table-responsive><table class="table table-striped"><tbody><tr><td>RDVMPC001</td><td>238.103.133.37</td><td><span class=text-success><i class="fa fa-check"></i></span></td></tr><tr><td>RDVMPC002</td><td>68.66.63.170</td><td><span class=text-success><i class="fa fa-check"></i></span></td></tr><tr><td>RDVMPC003</td><td>76.117.212.33</td><td><span tooltip="Server Down!" class=text-danger><i class="fa fa-warning"></i></span></td></tr><tr><td>RDPHPC001</td><td>91.88.224.5</td><td><span class=text-success><i class="fa fa-check"></i></span></td></tr><tr><td>RDESX001</td><td>197.188.15.93</td><td><span class=text-success><i class="fa fa-check"></i></span></td></tr><tr><td>RDESX002</td><td>168.85.154.251</td><td><span class=text-success><i class="fa fa-check"></i></span></td></tr><tr><td>RDESX003</td><td>209.25.191.61</td><td><span tooltip="Server Down!" class=text-danger><i class="fa fa-warning"></i></span></td></tr><tr><td>RDESX004</td><td>252.37.192.235</td><td><span class=text-success><i class="fa fa-check"></i></span></td></tr><tr><td>RDTerminal01</td><td>139.71.18.207</td><td><span class=text-success><i class="fa fa-check"></i></span></td></tr><tr><td>RDTerminal02</td><td>136.80.122.212</td><td><span tooltip="Could not connect!" class=text-warning><i class="fa fa-flash"></i></span></td></tr><tr><td>RDDomainCont01</td><td>196.80.245.33</td><td><span class=text-success><i class="fa fa-check"></i></span></td></tr></tbody></table></div></rd-widget-body><rd-widget-footer><ul class="pagination pagination-sm pull-right"><li><a href=#>&laquo;</a></li><li><a href=#>1</a></li><li><a href=#>2</a></li><li><a href=#>3</a></li><li><a href=#>&raquo;</a></li></ul><div class=clearfix></div></rd-widget-footer></rd-widget></div></div>\n-->'),a.put("app/templates/dashboard.html",'<div class="row alerts-container" data-ng-controller=AlertsCtrl data-ng-show=alerts.length><div class=col-xs-12><alert data-ng-repeat="alert in alerts" type={{alert.type}}><button type=button class=close ng-click=deleteAlert(alert)>&times;</button>{{alert.message}}</alert></div></div><div class=row><div class="col-lg-3 col-md-6 col-xs-12"><rd-widget><rd-widget-body><div class="widget-icon green pull-left"><i class="fa fa-tasks"></i></div><div class=title>8</div><div class=comment>New Batches</div></rd-widget-body></rd-widget></div><div class="col-lg-3 col-md-6 col-xs-12"><rd-widget><rd-widget-body><div class="widget-icon red pull-left"><i class="fa fa-sliders"></i></div><div class=title>6</div><div class=comment>Batches Unprocessed</div></rd-widget-body></rd-widget></div><div class="col-lg-3 col-md-6 col-xs-12"><rd-widget><rd-widget-body><div class="widget-icon orange pull-left"><i class="fa fa-folder-open"></i></div><div class=title>2 / 4</div><div class=comment>Completed Jobs</div></rd-widget-body></rd-widget></div><div class="col-lg-3 col-md-6 col-xs-12"><rd-widget><rd-widget-body><div class="widget-icon blue pull-left"><i class="fa fa-edit"></i></div><div class=title>8</div><div class=comment>Developed PCR Assays</div></rd-widget-body></rd-widget></div></div><div class=row><div class=col-lg-6 data-ng-controller=DeviceCtrl data-ng-show=devices.length><rd-widget><rd-widget-header icon=fa-power-off title=Devices><div class=btn-group role=group aria-label=...><button type=button data-toggle=button class="btn btn-default" ng-click=Initialize()>On</button> <button type=button data-toggle=button class="btn btn-default" ng-click=Deinitialize()>Off</button></div></rd-widget-header><rd-widget-body classes="medium no-padding"><div class=table-responsive><table class=table><thead><tr><th>Instrument</th><th>Status</th><th></th></tr></thead><tbody><tr data-ng-repeat="device in devices"><td>{{device.name}}</td><td>{{device.status}}</td><td class={{device.iconClass}}><i class={{device.icon}}></i></td></tr></tbody></table></div></rd-widget-body></rd-widget></div><div class=col-lg-6 data-ng-controller=JobCtrl><rd-widget><rd-widget-header icon=fa-tasks title="Current Tasks"></rd-widget-header><rd-widget-body classes="medium no-padding"><div class=table-responsive><table class=table><input placeholder=Search ng-model=searchText class="form-control input-sm"><thead><tr><th>Batch</th><th>Initiated By</th><th>PCR Assay</th><th>Status</th><th></th></tr></thead><tbody><tr data-ng-repeat="job in jobs | filter:searchText"><td>{{job.batchId}}</td><td>{{job.author}}</td><td>{{job.pcrTemplate}}</td><td>{{job.status}}</td><td><i class={{job.icon}}></i></td></tr></tbody></table></div></rd-widget-body><rd-widget></rd-widget></rd-widget></div></div>'),a.put("app/templates/jobs.html",'<div class=row ng-controller=JobCtrl><div class=col-lg-12><rd-widget><rd-widget-header icon=fa-folder-open title="Available Batches"></rd-widget-header><rd-widget-body classes="medium no-padding"><div class=table-responsive><table class=table data-toggle=table id=events-id2 data-url=data1.json data-height=299 data-cache=false data-search=true><input placeholder=Filter ng-model=searchText class="form-control input-sm"><thead><tr><th data-field=id data-sortable=true>Batch ID</th><th data-field=price data-sortable=true>Created On</th><th>Select</th></tr></thead><tbody><tr><td>Batch005</td><td>10-15-2015</td><td><input type=checkbox><tr><td>Batch006</td><td>10-15-2015</td><td><input type=checkbox><tr><td>Batch007</td><td>10-15-2015</td><td><input type=checkbox><tr><td>Batch008</td><td>10-15-2015</td><td><input type=checkbox><tr><td>Batch009</td><td>10-15-2015</td><td><input type=checkbox><tr><td>Batch010</td><td>10-15-2015</td><td><input type=checkbox></td></tr></td></tr></td></tr></td></tr></td></tr></td></tr></tbody></table></div></rd-widget-body><rd-widget-footer><div class=clearfix></div></rd-widget-footer></rd-widget></div><!--<div class="col-lg-6">\n    <rd-widget>\n      <rd-widget-header icon="fa-flask" title="Available PCR Templates">\n      </rd-widget-header>\n      <rd-widget-body classes="medium no-padding">\n        <div class="table-responsive">\n          <table class="table table-striped">\n            <input type="text" placeholder="Filter" ng-model="searchText" class="form-control input-sm"/>\n            <thead>\n      	      <tr>\n                <th data-field="id" data-sortable="true">Batch ID</th>\n                <th data-field="price" data-sortable="true">Created On</th>\n                <th>Select</th>\n              </tr>\n            </thead>\n            <tbody>\n              <tr><td>PCR_Setup001</td><td>10-15-2015</td><td><input type="checkbox"></input>\n              <tr><td>PCR_Setup002</td><td>10-15-2015</td><td><input type="checkbox"></input>\n              <tr><td>PCR_Setup003</td><td>10-15-2015</td><td><input type="checkbox"></input>\n              <tr><td>PCR_Setup004</td><td>10-15-2015</td><td><input type="checkbox"></input>\n              <tr><td>PCR_Setup005</td><td>10-15-2015</td><td><input type="checkbox"></input>\n              <tr><td>PCR_Setup006</td><td>10-15-2015</td><td><input type="checkbox"></input>\n              <tr><td>PCR_Setup007</td><td>10-15-2015</td><td><input type="checkbox"></input>\n              <tr><td>PCR_Setup008</td><td>10-15-2015</td><td><input type="checkbox"></input>\n           </tbody>\n          </table>\n        </div>\n      </rd-widget-body>\n      <rd-widget-footer>\n        <div class="clearfix">\n        </div>\n      </rd-widget-footer>\n    </rd-widget>\n  </div>--><div class=col-lg-12><rd-widget><rd-widget-header icon="fa fa-gears" title="Job Details"></rd-widget-header><rd-widget-body classes="small no-padding"></rd-widget-body><rd-widget-footer><button class="btn btn-sm btn-info" ng-click=delete()>Queue Job</button></rd-widget-footer></rd-widget></div></div>'),a.put("app/templates/reports.html",'<div class=row><div class=col-lg-6><rd-widget><rd-widget-header icon=fa-folder-open title="Available Batches"></rd-widget-header><rd-widget-body classes="medium no-padding"><div class=table-responsive><table class=table data-toggle=table id=events-id2 data-url=data1.json data-height=299 data-cache=false data-search=true><thead><tr><th data-field=state data-checkbox=true></th><th data-field=id data-sortable=true>Batch ID</th><th data-field=price data-sortable=true>Created On</th></tr></thead><!--<tbody>\n              <tr><td>RDVMPC001</td><td>238.103.133.37</td><td><span class="text-success"><i class="fa fa-check"></i></span></td></tr>\n              <tr><td>RDVMPC002</td><td>68.66.63.170</td><td><span class="text-success"><i class="fa fa-check"></i></span></td></tr>\n              <tr><td>RDVMPC003</td><td>76.117.212.33</td><td><span tooltip="Server Down!" class="text-danger"><i class="fa fa-warning"></i></span></td></tr>\n              <tr><td>RDPHPC001</td><td>91.88.224.5</td><td><span class="text-success"><i class="fa fa-check"></i></span></td></tr>\n              <tr><td>RDESX001</td><td>197.188.15.93</td><td><span class="text-success"><i class="fa fa-check"></i></span></td></tr>\n              <tr><td>RDESX002</td><td>168.85.154.251</td><td><span class="text-success"><i class="fa fa-check"></i></span></td></tr>\n              <tr><td>RDESX003</td><td>209.25.191.61</td><td><span tooltip="Server Down!" class="text-danger"><i class="fa fa-warning"></i></span></td></tr>\n              <tr><td>RDESX004</td><td>252.37.192.235</td><td><span class="text-success"><i class="fa fa-check"></i></span></td></tr>\n              <tr><td>RDTerminal01</td><td>139.71.18.207</td><td><span class="text-success"><i class="fa fa-check"></i></span></td></tr>\n              <tr><td>RDTerminal02</td><td>136.80.122.212</td><td><span tooltip="Could not connect!" class="text-warning"><i class="fa fa-flash"></i></span></td></tr>\n              <tr><td>RDDomainCont01</td><td>196.80.245.33</td><td><span class="text-success"><i class="fa fa-check"></i></span></td></tr>\n            </tbody>--></table></div></rd-widget-body><rd-widget-footer><ul class="pagination pagination-sm pull-right"><li><a href=#>&laquo;</a></li><li><a href=#>1</a></li><li><a href=#>2</a></li><li><a href=#>3</a></li><li><a href=#>4</a></li><li><a href=#>5</a></li><li><a href=#>&raquo;</a></li></ul><div class=clearfix></div></rd-widget-footer></rd-widget></div><div class=col-lg-6><rd-widget><rd-widget-header icon=fa-flask title="PCR Templates"><a href=#>Manage</a></rd-widget-header><rd-widget-body classes="medium no-padding"><div class=table-responsive><table class="table table-striped"><tbody><tr><td>RDVMPC001</td><td>238.103.133.37</td><td><span class=text-success><i class="fa fa-check"></i></span></td></tr><tr><td>RDVMPC002</td><td>68.66.63.170</td><td><span class=text-success><i class="fa fa-check"></i></span></td></tr><tr><td>RDVMPC003</td><td>76.117.212.33</td><td><span tooltip="Server Down!" class=text-danger><i class="fa fa-warning"></i></span></td></tr><tr><td>RDPHPC001</td><td>91.88.224.5</td><td><span class=text-success><i class="fa fa-check"></i></span></td></tr><tr><td>RDESX001</td><td>197.188.15.93</td><td><span class=text-success><i class="fa fa-check"></i></span></td></tr><tr><td>RDESX002</td><td>168.85.154.251</td><td><span class=text-success><i class="fa fa-check"></i></span></td></tr><tr><td>RDESX003</td><td>209.25.191.61</td><td><span tooltip="Server Down!" class=text-danger><i class="fa fa-warning"></i></span></td></tr><tr><td>RDESX004</td><td>252.37.192.235</td><td><span class=text-success><i class="fa fa-check"></i></span></td></tr><tr><td>RDTerminal01</td><td>139.71.18.207</td><td><span class=text-success><i class="fa fa-check"></i></span></td></tr><tr><td>RDTerminal02</td><td>136.80.122.212</td><td><span tooltip="Could not connect!" class=text-warning><i class="fa fa-flash"></i></span></td></tr><tr><td>RDDomainCont01</td><td>196.80.245.33</td><td><span class=text-success><i class="fa fa-check"></i></span></td></tr></tbody></table></div></rd-widget-body><rd-widget-footer><ul class="pagination pagination-sm pull-right"><li><a href=#>&laquo;</a></li><li><a href=#>1</a></li><li><a href=#>2</a></li><li><a href=#>3</a></li><li><a href=#>&raquo;</a></li></ul><div class=clearfix></div></rd-widget-footer></rd-widget></div></div>'),a.put("components/modal/modal.html",'<div class=modal-header><button ng-if=modal.dismissable type=button ng-click=$dismiss() class=close>&times;</button><h4 ng-if=modal.title ng-bind=modal.title class=modal-title></h4></div><div class=modal-body><p ng-if=modal.text ng-bind=modal.text></p><div ng-if=modal.html ng-bind-html=modal.html></div></div><div class=modal-footer><button ng-repeat="button in modal.buttons" ng-class=button.classes ng-click=button.click($event) ng-bind=button.text class=btn></button></div>')}]);