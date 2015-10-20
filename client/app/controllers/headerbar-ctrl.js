'use strict';

angular.module('hamiltonApp')
  .controller('HeaderbarCtrl', function ($scope, $http) {
    $scope.header = 'Hello';
    $scope.breadcrumb = "Home / " + $scope.header;
  });
