/**
 * Jobs Controller
 */

angular.module('hamiltonApp')
    .controller('JobCtrl', function JobCtrl($scope, $http, $log, Modal, socket) {
   
    // Get all jobs
    $http.get('/api/jobs').success(function(allJobs) {
        // Log into console
        $log.log('Getting Jobs');
        $scope.jobs = allJobs;
        socket.syncUpdates('jobs', $scope.jobs);
    });
    
    
    
    // Deleting all device alerts
    $scope.clearDeviceAlerts = function(){
        for (var index = 0; index < $scope.alerts.length; index++) {
            var element = $scope.alerts[index];
            $scope.deleteDeviceAlert(element);
        };
    };
    
    // Queue Job
    $scope.delete = Modal.confirm.delete(function(){
        
    });
    
    
    });