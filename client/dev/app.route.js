;(function(ng) {
  'use strict';

  ng.module('process-monitoring')
    .config([
      '$routeProvider',
      function($routeProvider) {
        $routeProvider
          .when('/', {
            templateUrl: 'beer/templates/login.html'/*,
            controller: 'LoginController',
            controllerAs: 'loginCtrl'*/
          })
          .otherwise({
            redirectTo: '/'
          });
      }
    ]);
}(window.angular));
