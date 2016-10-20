;(function(ng) {
  'use strict';

  ng.module('process-monitoring')
    .controller('MonitorController', ['$log','$scope','$window','$http', function($log,$scope,$window,$http) {
      var self = this;

      $scope.startProcess=function(){
        $log.log("UA");
      };

      $scope.logout=function(){
        //OBVIOUS TODO: AUTH
        $window.location.href='https://localhost:3000/'
      };

      $scope.cambiarContrasena = function(user){
        $window.alert("Cambio de contraseña");
      }

    }]);
}(window.angular));
