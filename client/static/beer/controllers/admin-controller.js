;(function(ng) {
  'use strict';

  ng.module('process-monitoring')
    .controller('AdminController', ['$scope','$window','$http', 'UsersDAO', function($scope,$window,$http,UsersDAO) {
      var self = this;
      $scope.UsersDAO = UsersDAO;
      $scope.sortType     = 'date'; // set the default sort type
      $scope.sortReverse  = true;  // set the default sort order
      $scope.paso = {"msg":"","detalle":"","autom":false, "img":null};

      //OBVIOUS TODO: GET RECIPES FROM SERVER
      $scope.listaRecetas = ["Receta 1", "Receta 2", "Receta 3"];
      $scope.receta = {};
      var recetaStatic = {"Nombre":"","Instrucciones":[
        {"msg":"Calentar agua","autom":false, "detalle":"Encender el mechero hasta el herbor", "img": null},
        {"msg":"Colocar bombas para trasvase de agua","autom":true, "detalle":"Se debe abir esta valvula primero", "img": "/static/common/images/valvula1.jpg"}
        ]};
      $scope.logs = [{"date":"2016 05 15", "name":"Cook1"},{"date":"2016 06 15", "name":"Cook2"},{"date":"2016 05 03", "name":"Cook3"},{"date":"2016 05 30", "name":"Cook4"}]
        

      $scope.createRecipe=function(recetaNombre){
        $scope.receta={"Nombre":recetaNombre, "Instrucciones":[]};
        $('#recipeForm').show();
        $('#listOfCooks').hide();
        
      };

      $scope.startEditRecipe=function(recetaNombre){
        //OBVIOUS TODO: GET DATA FROM SERVER
        $scope.receta = recetaStatic;
        $scope.receta.Nombre = recetaNombre;
        $('#recipeForm').show();
        $('#listOfCooks').hide();
      };

      $scope.saveStep=function(paso){
        $scope.receta.Instrucciones.push(paso);
        $scope.hideStep();
      };

      $scope.deleteStep=function(indice){
        $scope.receta.Instrucciones.splice(indice,1);
        $scope.hideStep();
      };

      $scope.deleteRecipe=function(recetaNombre){
        //OBVIOUS TODO: POST DATA TO SERVER
        $window.alert(recetaNombre);
      };

      $scope.listCooking=function(){
        $('#listOfCooks').show();
        $('#recipeForm').hide();
      };

      $scope.downloadLog=function(logNombre){
        $window.alert(logNombre);
      };

      $scope.popupModal=function(name){
        $("#"+name).modal();
      };

      $scope.addStep=function(){
        $scope.paso.autom = false;
        $('#pasoForm').show();
      };

      $scope.hideStep=function(){
        $scope.paso = {};
        $scope.recetaFase = {};
        $('#pasoForm').hide();
      };

      $scope.getNumber=function(num){
        return new Array(num);
      };
     
    }]);
}(window.angular));