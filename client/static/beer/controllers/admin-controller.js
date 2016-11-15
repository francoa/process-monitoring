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
      var newStep = -1;
      $scope.btnMsg = "Agregar";
      $scope.listaRecetas = RecipeDAO.getRecipesNames();
      $scope.logs = RecipeDAO.getLogs();
      var pasoTemplate = {"id":null, "msg":"","detalle":"","autom":false, "img":null, "fases":[], "numFases":0};
      var recetaTemplate = {"Nombre":"", "Instrucciones":[]};
      var stepId = 0;
      $scope.paso = angular.copy(pasoTemplate);
      /***********************/
      /**     VARIABLES     **/
      /***********************/
        
      /********************/
      /**     RECETA     **/
      /********************/
      $scope.createRecipe=function(recetaNombre){
        $scope.receta=angular.copy(recetaTemplate);
        hideAll();
        var promise = RecipeDAO.getRecipeName(recetaNombre);

        promise.then(function(){
          $("#rcpName-modal").modal('hide');
          $scope.receta.Nombre = recetaNombre;
          stepId = 0;
          $('#recipeForm').show();
        },function(){
          $window.alert("Nombre repetido, elija otro nombre.");
        });
      };

      $scope.hideRecipe=function(){
        $scope.receta=angular.copy(recetaTemplate);
        hideAll();
      };

      $scope.startEditRecipe=function(recetaNombre){
        $scope.receta=angular.copy(recetaTemplate);
        hideAll();
        var promise = RecipeDAO.getRecipe(recetaNombre);

        promise.then(function(data){
          $scope.receta = data;
          maxId($scope.receta.Instrucciones);
          $('#recipeForm').show();
        }, function(){
          $window.alert("No se pudo cargar la receta.");
        });
      };

      $scope.deleteRecipe=function(recetaNombre){
        hideAll();
        RecipeDAO.deleteRecipe(recetaNombre);
        stepId = 0;
      };

      $scope.saveRecipe=function(){
        console.log($scope.receta);
        var promise = RecipeDAO.saveRecipe($scope.receta);
        promise.then(function(){
          stepId = 0;
          hideAll();
        }, function(){
          $window.alert("No se pudo guardar la receta.");
        });
      };
      /********************/
      /**     RECETA     **/
      /********************/

      /******************/
      /**     PASO     **/
      /******************/
      $scope.saveStep=function(){
        $('#imginput')[0].value = "";
        if (newStep == -1){
          $scope.paso.id = angular.copy(stepId);
          $scope.receta.Instrucciones.push($scope.paso);
          stepId = stepId + 1;
        }
        $scope.hideStep();
      };

      $scope.deleteStep=function(idSt){
        var indice = searchId($scope.receta.Instrucciones,idSt);
        $scope.receta.Instrucciones.splice(indice,1);
        fixIds($scope.receta.Instrucciones,idSt);
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

      $scope.editStep=function(idSt){
        var indice = searchId($scope.receta.Instrucciones,idSt);
        $scope.paso = $scope.receta.Instrucciones[indice];
        $('#pasoForm').show();
        newStep = idSt;
        $scope.btnMsg = "Guardar";
      };

      $scope.moveUpStep=function(idSt){
        if (idSt != 0){
          var indice = searchId($scope.receta.Instrucciones,idSt);
          $scope.receta.Instrucciones.forEach(function(entry){
            if (entry.id == idSt - 1)
              entry.id = angular.copy(idSt);
          });
          $scope.receta.Instrucciones[indice].id = angular.copy(idSt - 1);
        }
      };

      $scope.moveDownStep=function(idSt){
        if (idSt != $scope.receta.Instrucciones.length-1){
          var indice = searchId($scope.receta.Instrucciones,idSt);
          $scope.receta.Instrucciones.forEach(function(entry){
            if (entry.id == idSt + 1)
              entry.id = angular.copy(idSt);
          });
          $scope.receta.Instrucciones[indice].id = angular.copy(idSt + 1);
        }
      };

      /******************/
      /**     PASO     **/
      /******************/

      /*****************/
      /**   ID HAND   **/
      /*****************/
      var maxId = function(array){
        var idMax = 0;
        array.forEach(function(entry){
          if(entry.id > idMax)
            idMax = angular.copy(entry.id);
        });
        idMax = idMax + 1;
        $window.alert(stepId);
        stepId = angular.copy(idMax);
        $window.alert(stepId);
      };

      var fixIds = function(array,index){
        array.forEach(function(entry){
          if (entry.id > index)
            entry.id = entry.id - 1;
        });
      };

      var searchId = function(array,idSt){
        var indice = array.findIndex(function(element){
          return element.id == idSt;
        });
        return indice;
      };

      /*****************/
      /**   ID HAND   **/
      /*****************/

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

      $('body').on('change','input[id=\'imginput\']',function(event){
        if ($('#imginput')[0].files.length !== 0){
          $scope.paso.img = $('#imginput')[0].files[0];
        };
      });

      /*function readURL(input) {
        if (input.files && input.files[0]) {
          var reader = new FileReader();
            
          reader.onload = function (e) {
            $('#blah').attr('src', e.target.result);
          }
        
          reader.readAsDataURL(input.files[0]);
        }
      }
    
      $("#imgInp").change(function(){
        readURL(this);
      });*/
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