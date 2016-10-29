;(function(ng) {
  'use strict';

  ng.module('process-monitoring')
    .controller('AdminController', ['$scope','$window','$http', 'UsersDAO', function($scope,$window,$http,UsersDAO) {
      /***********************/
      /**     VARIABLES     **/
      /***********************/
      var self = this;
      $scope.UsersDAO = UsersDAO;
      $scope.sortType     = 'date'; // set the default sort type
      $scope.sortReverse  = true;  // set the default sort order
      var pasoInitial = {"msg":"","detalle":"","autom":false, "img":null, "fases":[], "numFases":0};
      $scope.paso = angular.copy(pasoInitial);
      $scope.receta = {};
      var newStep = -1;
      $scope.btnMsg = "Agregar";

      //OBVIOUS TODO: GET RECIPES FROM SERVER
      $scope.listaRecetas = ["Receta 1", "Receta 2", "Receta 3"];
      var recetaEdit = {"Nombre":"","Instrucciones":[
        {"msg":"Calentar agua","autom":false, "detalle":"Encender el mechero hasta el herbor", "img": null, "fases":[], "numFases":0},
        {"msg":"Colocar bombas para trasvase de agua","autom":true, "detalle":"Se debe abir esta valvula primero", "img": "/static/common/images/valvula1.jpg","fases":[{"temp":12, "time":12, "tdiff":12},{"temp":12, "time":12, "tdiff":12}], "numFases":2}
        ]};
      $scope.logs = [{"date":"2016 05 15", "name":"Cook1"},{"date":"2016 06 15", "name":"Cook2"},{"date":"2016 05 03", "name":"Cook3"},{"date":"2016 05 30", "name":"Cook4"}]
      /***********************/
      /**     VARIABLES     **/
      /***********************/
        
      /********************/
      /**     RECETA     **/
      /********************/
      $scope.createRecipe=function(recetaNombre){
        $("#rcpName-modal").modal('hide');
        $scope.receta={"Nombre":recetaNombre, "Instrucciones":[]};
        hideAll();
        $('#recipeForm').show();
      };

      $scope.hideRecipe=function(){
        $scope.receta = {};
        hideAll();
      };

      $scope.startEditRecipe=function(recetaNombre){
        //OBVIOUS TODO: GET DATA FROM SERVER
        $scope.receta = angular.copy(recetaEdit);
        $scope.receta.Nombre = recetaNombre;
        hideAll();
        $('#recipeForm').show();
      };

      $scope.deleteRecipe=function(recetaNombre){
        //OBVIOUS TODO: POST DATA TO SERVER
        $window.alert(recetaNombre);
        hideAll();
      };

      $scope.saveRecipe=function(){
        $window.alert("guardar" + $scope.receta);
        hideAll();
        $scope.receta = {};
      };
      /********************/
      /**     RECETA     **/
      /********************/

      /******************/
      /**     PASO     **/
      /******************/
      $scope.saveStep=function(paso){
        if (newStep == -1)
          $scope.receta.Instrucciones.push(paso);
        else
          $scope.receta.Instrucciones[newStep] = angular.copy(paso);
        $scope.hideStep();
      };

      $scope.deleteStep=function(indice){
        $scope.receta.Instrucciones.splice(indice,1);
        $scope.hideStep();
      };

      $scope.addStep=function(){
        $scope.paso = angular.copy(pasoInitial);
        $('#pasoForm').show();
        newStep = -1;
        $scope.btnMsg = "Agregar";
      };

      $scope.hideStep=function(){
        $('#pasoForm').hide();
      };

      $scope.editStep=function(indice){
        $scope.paso = angular.copy($scope.receta.Instrucciones[indice]);
        $('#pasoForm').show();
        newStep = indice;
        $scope.btnMsg = "Guardar";
      };

      $scope.moveUpStep=function(indice){
        if (indice != 0){
          var temp = angular.copy($scope.receta.Instrucciones[indice-1]);
          $scope.receta.Instrucciones[indice-1] = angular.copy($scope.receta.Instrucciones[indice]);
          $scope.receta.Instrucciones[indice] = angular.copy(temp);
        }
      };

      $scope.moveDownStep=function(indice){
        if (indice != $scope.receta.Instrucciones.length-1){
          var temp = angular.copy($scope.receta.Instrucciones[indice+1]);
          $scope.receta.Instrucciones[indice+1] = angular.copy($scope.receta.Instrucciones[indice]);
          $scope.receta.Instrucciones[indice] = angular.copy(temp);
        }
      };

      /******************/
      /**     PASO     **/
      /******************/

      /******************/
      /**     LOGS     **/
      /******************/
      $scope.listCooking=function(){
        hideAll();
        $('#listOfCooks').show();
      };

      $scope.downloadLog=function(logNombre){
        $window.alert(logNombre);
      };
      /******************/
      /**     LOGS     **/
      /******************/
      
      /*******************/
      /**     MODALS    **/
      /*******************/
      $scope.popupModal=function(name){
        $("#"+name).modal();
      };

      $('#rcpName-modal').on('shown.bs.modal', function() {
        $('#rcpNameInputModal').focus();
      });
      /*******************/
      /**     MODALS    **/
      /*******************/
     
      $scope.getNumber=function(num){
        return new Array(num);
      };

      var hideAll = function(){
        $scope.hideStep();
        $('#recipeForm').hide();
        $('#listOfCooks').hide();
      };

    }]);
}(window.angular));