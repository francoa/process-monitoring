;(function(ng) {
  'use strict';

  ng.module('process-monitoring')
    .config([
      '$routeProvider',
      function($routeProvider) {
        $routeProvider
          .when('/login', {
            templateUrl: './beer/templates/login.html',
            controller: 'LoginController',
            controllerAs: 'loginCtrl'
          })
          .when('/monitor',{
            templateUrl: './beer/templates/monitor.html',
            controller: 'MonitorController',
            controllerAs: 'monitorCtrl'
          })
          .when('/admin',{
            templateUrl: './beer/templates/admin.html',
            controller: 'AdminController',
            controllerAs: 'adminCtrl'
          })
          .otherwise({
            redirectTo: '/login'
          });
      }
    ]);
}(window.angular));
