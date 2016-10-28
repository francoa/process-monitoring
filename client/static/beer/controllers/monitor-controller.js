;(function(ng) {
  'use strict';

  ng.module('process-monitoring')
    .controller('MonitorController', ['$log','$scope','$window','$http', function($log,$scope,$window,$http) {
      var self = this;

      //OBVIOUS TODO: GET RECIPES FROM SERVER
      $scope.recetas = ["Receta 1", "Receta 2", "Receta 3"];
      $scope.paso = 0;
      $scope.instrucciones = [
        {"msg":"Calentar agua","autom":false},
        {"msg":"Colocar bombas para trasvase de agua","autom":false},
        {"msg":"Alcanzar TºC de olla licor","autom":false},
        {"msg":"Alcanzar TºC para macerar","autom":false},
        {"msg":"Mash-in","autom":false},
        {"msg":"Control tiempos","autom":false},
        {"msg":"Colocar bomba en herms","autom":false},
        {"msg":"Colocar mangueras herms","autom":false},
        {"msg":"Segundo escalon de TºC","autom":true},
        {"msg":"Medir tiempo","autom":false},
        {"msg":"Mash-out","autom":false},
        {"msg":"Reposicionar bombas recirculado","autom":false},
        {"msg":"Recirculado","autom":false},
        {"msg":"Colocar bombas para knock-out","autom":false},
        {"msg":"Colocar bombas para lavado","autom":false},
        {"msg":"Lavado de grano","autom":false}];
      
      $scope.detalle = [
        {"msg": "Encender el mechero hasta el herbor", "img": null},
        {"msg": "Se debe abir esta valvula primero", "img": "/static/common/images/valvula1.jpg"}];

      $scope.startProcess=function(receta){
        $window.alert(receta);
      };

      $scope.logout=function(){
        //OBVIOUS TODO: AUTH
        $window.location.href='https://localhost:8000/'
      };

      $scope.cambiarContrasena = function(user){
        $window.alert("Cambio de contraseña");
      }

      $scope.pasoSiguiente = function(){
        $scope.paso = $scope.paso+1;
      }

      $scope.popupModal=function(name){
        $("#"+name).modal();
      } 

    }]);
}(window.angular));