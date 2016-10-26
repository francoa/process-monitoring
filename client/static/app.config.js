;(function(ng) {
  'use strict';

  ng.module('process-monitoring')
    .config([
      '$locationProvider',
      function($locationProvider) {
        
        $locationProvider.html5Mode(true);
        
      }
    ]);
}(window.angular));
