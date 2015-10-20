
'use strict';

/**
 * Alerts Controller
 */

angular
    .module('hamiltonApp')
    .controller('AlertsCtrl', function AlertsCtrl($scope, $http, $log, socket) {
     
     $scope.alerts = [];
        
    // Get all alerts
    $http.get('/api/alerts').success(function(allAlerts) {
      $log.log('Getting Alerts');
      $scope.alerts = allAlerts;
      socket.syncUpdates('alert', $scope.alerts);
    });
    
    // Add alert
    $scope.addAlert = function(alert) {
        $http.post('api/alerts', alert);
        $log.log('Alert Added!');
    };
    
    // Delete alert
    $scope.deleteAlert = function(alert) {
        $http.delete('/api/alerts/' + alert._id);
    };
    
    //Delete device alert
    $scope.deleteDeviceAlert = function(alert) {
        $http.delete('/api/alerts/device/' + alert._id);
    };
    
    // Close Alert
    $scope.closeAlert = function(index) {
        $scope.alerts.splice(index, 1);
    };
    
    $scope.$on('$destroy', function() {
        socket.unsyncUpdates('alert');
    });
    
    
  });