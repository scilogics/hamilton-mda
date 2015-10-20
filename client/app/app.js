'use strict';

angular.module('hamiltonApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'btford.socket-io',
  'ui.router',
  'ui.bootstrap'
])
  .config(function ($stateProvider, $urlRouterProvider, $locationProvider) {
    $urlRouterProvider
      .otherwise('/');

    //$locationProvider.html5Mode(true);
    
    // Application routes
    $stateProvider
        .state('index', {
            url: '/',
            templateUrl: 'app/templates/dashboard.html'
        })
        .state('assays', {
            url: '/assays',
            templateUrl: 'app/templates/assays.html'
        })
        .state('jobs', {
            url: '/jobs',
            templateUrl: 'app/templates/jobs.html'
        })
        .state('reports', {
            url: '/reports',
            templateUrl: 'app/templates/reports.html'
        });
  });
