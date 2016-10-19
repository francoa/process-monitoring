;(function(ng) {
  'use strict';

  ng.module('process-monitoring')
    .controller('LoginController', ['$log','$scope','$window', function($log,$scope,$window) {
      var self = this;
      $scope.searchGoogle=function(keywords){
        $log.log(keywords);
        keywords = keywords.replace(" ","+");
        $window.location.href='https://www.google.com.ar/search?q='+keywords;
      };

    }]);
}(window.angular));
