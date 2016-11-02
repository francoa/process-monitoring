;(function(ng) {
  'use strict';

  ng.module('process-monitoring')
    .config([
      '$locationProvider',
      '$httpProvider',
      function($locationProvider,$httpProvider) {
        
        $locationProvider.html5Mode(true);
        $httpProvider.defaults.xsrfCookieName = 'csrftoken';
        $httpProvider.defaults.xsrfHeaderName = 'X-CSRFToken';
      }
    ]);
}(window.angular));
