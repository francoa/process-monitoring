;(function(ng) {
  'use strict';

  ng.module('process-monitoring')
    .config([
      '$routeProvider',
      function($routeProvider) {
        $routeProvider
          .when('/', {
            templateUrl: 'beer/templates/beer.html',
            controller: 'BeerController',
            controllerAs: 'beerCtrl'
          })
          .otherwise({
            redirectTo: '/'
          });
      }
    ]);
}(window.angular));
