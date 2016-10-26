;(function(ng) {
  'use strict';

  ng.module('process-monitoring')
    .controller('AdminController', ['$log','$scope','$window','$http', function($log,$scope,$window,$http) {
      var self = this;

     
      $scope.logout=function(){
        //OBVIOUS TODO: AUTH
        $window.location.href='http://localhost:8000/'
      };

      $scope.cambiarContrasena = function(user){
        $window.alert("Cambio de contraseña");
      }
     
    }]);
}(window.angular));