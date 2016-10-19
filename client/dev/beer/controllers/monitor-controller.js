;(function(ng) {
  'use strict';

  ng.module('process-monitoring')
    .controller('MonitorController', ['$log','$scope','$window','$http', function($log,$scope,$window,$http) {
      var self = this;

      $scope.startProcess=function(){
        $log.log("UA");
      };

      $scope.logout=function(){
        $log.log("UA");
      };

      $scope.cambiarContrasena = function(user){
        $log.log("UA");
      }

    }]);
}(window.angular));
