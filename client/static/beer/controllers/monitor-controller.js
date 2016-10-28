;(function(ng) {
  'use strict';

  ng.module('process-monitoring')
    .controller('MonitorController', ['$log','$scope','$window','$http', '$interval', function($log,$scope,$window,$http,$interval) {
      var self = this;
      var timer;

      //OBVIOUS TODO: GET RECIPES FROM SERVER
      $scope.recetas = ["Receta 1", "Receta 2", "Receta 3"];
      $scope.paso = 0;
      $scope.instrucciones = [
        {"msg":"Calentar agua","autom":false},
        {"msg":"Colocar bombas para trasvase de agua","autom":true},
        {"msg":"Alcanzar TºC de olla licor","autom":false},
        {"msg":"Alcanzar TºC para macerar","autom":false},
        {"msg":"Mash-in","autom":false},
        {"msg":"Control tiempos","autom":false},
        {"msg":"Colocar bomba en herms","autom":false},
        {"msg":"Colocar mangueras herms","autom":false},
        {"msg":"Segundo escalon de TºC","autom":false},
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

      var count = 0;
      //OBVIOUS TODO: GET RECIPES FROM SERVER

      var verifyInstruction = function(){
        if (count == 1)
          stopTimer();
        count = count + 1;
      };

      var stopTimer = function(){
          $interval.cancel(timer);
          $("#button"+$scope.paso).show();
          $("#button"+$scope.paso).html("Finalizado");
          $("#spin"+$scope.paso).hide();
      };

      $scope.startProcess=function(receta){
        $window.alert(receta);
      };

      $scope.logout=function(){
        //OBVIOUS TODO: AUTH
        $window.location.href='https://localhost:8000/'
        //OBVIOUS TODO: AUTH
      };

      $scope.cambiarContrasena = function(user){
        $window.alert("Cambio de contraseña");
      };

      $scope.pasoSiguiente = function(){
        $scope.paso = $scope.paso+1;
      };

      $scope.inicioTimer = function(){
        if (angular.isDefined(timer)) {
          timer = undefined;
          $scope.pasoSiguiente();
          return;
        }
        $("#button"+$scope.paso).hide();
        $("#spin"+$scope.paso).show();
        count = 0;
        timer = $interval(verifyInstruction,1000);
      };

      $scope.popupModal=function(name){
        $("#"+name).modal();
      };
    }]);
}(window.angular));