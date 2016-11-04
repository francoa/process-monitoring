;(function(ng) {
  'use strict';

  ng.module('process-monitoring')
    .controller('AdminController', 
      ['$scope','$window','$http', 'UsersDAO', 'RecipeDAO', 
      function($scope,$window,$http,UsersDAO,RecipeDAO) {

      /***********************/
      /**     VARIABLES     **/
      /***********************/
      var self = this;
      $scope.UsersDAO = UsersDAO;

      var activate = function(){
        if (!UsersDAO.isAuthenticated() || !UsersDAO.isAdmin())
          UsersDAO.redirect();
      };
      activate();

      $scope.username = UsersDAO.getUserName();
      $scope.user = {'username':''};
      $scope.user.username = $scope.username;

      $scope.sortType     = 'date'; // set the default sort type
      $scope.sortReverse  = true;  // set the default sort order
      $scope.receta = {};
      var newStep = -1;
      $scope.btnMsg = "Agregar";
      $scope.listaRecetas = RecipeDAO.getRecipesNames();
      $scope.logs = RecipeDAO.getLogs();
      var pasoTemplate = {"msg":"","detalle":"","autom":false, "img":null, "fases":[], "numFases":0};
      var recetaTemplate = {"Nombre":recetaNombre, "Instrucciones":[]};
      $scope.paso = angular.copy(pasoTemplate);
      /***********************/
      /**     VARIABLES     **/
      /***********************/
        
      /********************/
      /**     RECETA     **/
      /********************/
      $scope.createRecipe=function(recetaNombre){
        RecipeDAO.getRecipeName(
          function(){
            $("#rcpName-modal").modal('hide');
            $scope.receta=recetaTemplate;
            hideAll();
            $('#recipeForm').show();
          },function(){
            $window.alert("Nombre repetido, elija otro nombre.");
          }, recetaNombre
        );
      };

      $scope.hideRecipe=function(){
        $scope.receta = {};
        hideAll();
      };

      $scope.startEditRecipe=function(recetaNombre){
        $scope.receta = RecipeDAO.getRecipe(recetaNombre);
        $scope.receta.Nombre = recetaNombre;
        hideAll();
        $('#recipeForm').show();
      };

      $scope.deleteRecipe=function(recetaNombre){
        RecipeDAO.deleteRecipe(recetaNombre);
        hideAll();
      };

      $scope.saveRecipe=function(){
        RecipeDAO.saveRecipe($scope.receta);
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
        $scope.paso = angular.copy(pasoTemplate);
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
        RecipeDAO.getLog(logNombre);
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

      /******************/
      /**     IMAGE    **/
      /******************/
      $scope.selectPic=function(){
        $('#imginput').trigger('click');
      }
      /******************/
      /**     IMAGE    **/
      /******************/

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