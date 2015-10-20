/**
 * Devices Controller
 */

angular.module('hamiltonApp')
    .controller('DeviceCtrl', function DeviceCtrl($controller, $scope, $http, $log, socket) {
   
    // Bring in AlertsCtrl
    var AlertsCtrl = $controller('AlertsCtrl', {$scope: $scope});
    
    // Get Device Information
    $http.get('/api/devices').success(function(allDevices) {
        $log.log('Getting Device Status');
        for (var index = 0; index < allDevices.length; index++) {
            var device = allDevices[index];
            if(device.status == 'Device Offline') {
                $scope.addAlert({
                    component: 'device', 
                    type: 'danger',
                    message: device.name + ' is not connected.  Make sure device is turned on.'
                });
            }
        }
        $scope.devices = allDevices;
        socket.syncUpdates('device', $scope.devices);
    });
    
    
    
    //Deleting all device alerts
    $scope.clearDeviceAlerts = function(){
        for (var index = 0; index < $scope.alerts.length; index++) {
            var element = $scope.alerts[index];
            $scope.deleteDeviceAlert(element);
        };
    };
    
    
    
    //Initialize devices
    $scope.Initialize = function(){
        $log.log('Initializing Devices');
        $scope.clearDeviceAlerts();
        
        //Update Device status to being online
        for (var index = 0; index < $scope.devices.length; index++) {
          var device = $scope.devices[index];
          $http.put('/api/devices/' + device._id, { 
                status: 'Device Online', 
                iconClass: 'text-success',
                icon: 'fa fa-check'});
          }
        $scope.addAlert({
            component: 'device', 
            type: 'success',
            message: 'Systems are online!'});
        $log.log('Initialization Complete');
        return;
    };
    
    
    
    //Deinitialize devices
    $scope.Deinitialize = function(){
        $log.log('Deinitializing Devices');
        $scope.clearDeviceAlerts();
        
        // Update Device status to being offline
        for (var index = 0; index < $scope.devices.length; index++) {
          var device = $scope.devices[index];
          $http.put('/api/devices/' + device._id, { 
                status: 'Device Offline', 
                iconClass: 'text-warning',
                icon: 'fa fa-warning'});
          // Add offline warning alert
          $scope.addAlert({
                component: 'device',
                type: 'danger',
               message: device.name + ' is not connected.  Make sure device is turned on.'});
        }
        $log.log('Initialization Complete');
    };
    });