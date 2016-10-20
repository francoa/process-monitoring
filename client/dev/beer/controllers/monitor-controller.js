;(function(ng) {
  'use strict';

  ng.module('process-monitoring')
    .controller('MonitorController', ['$log','$scope','$window','$http', function($log,$scope,$window,$http) {
      var self = this;

      //OBVIOUS TODO: GET RECIPES FROM SERVER
      $scope.recetas = ["Receta 1", "Receta 2", "Receta 3"];

      $scope.startProcess=function(receta){
        $window.alert(receta);
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
