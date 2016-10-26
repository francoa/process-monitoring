;(function(ng) {
  'use strict';

  ng.module('process-monitoring')
    .controller('AdminController', ['$log','$scope','$window','$http', function($log,$scope,$window,$http) {
      var self = this;

      //OBVIOUS TODO: GET RECIPES FROM SERVER
      $scope.listaRecetas = ["Receta 1", "Receta 2", "Receta 3"];
      $scope.receta = {"nombre":"","fases":[]};

      $scope.logout=function(){
        //OBVIOUS TODO: AUTH
        $window.location.href='http://localhost:8000/'
      };

      $scope.cambiarContrasena = function(user){
        $window.alert("Cambio de contraseña");
      }

      $scope.createRecipe=function(numFases){
        $scope.receta={"nombre":"", "fases":[]};
        var temp = {"temp":"", "tdiff": "", "time":""};
        for (var i=0; i<numFases; i++){
          temp.id=i;
          $scope.receta.fases[i]=temp;
        };
        $('#recipe_form').show();
      };

      $scope.startEditRecipe=function(recetaNombre){
        //OBVIOUS TODO: GET DATA FROM SERVER
        if (recetaNombre == "Receta 1"){
          $scope.receta = {"nombre":"STOUT", "fases":[{"temp":50, "tdiff": 5, "time":60},{"temp":60, "tdiff": 5,"time":20},{"temp":70, "tdiff": 5, "time":10}]};
        }
        else if (recetaNombre == "Receta 2"){
          $scope.receta = {"nombre":"LAGGER", "fases":[{"temp":40, "tdiff": 5, "time":40},{"temp":50, "tdiff": 2, "time":20},{"temp":60, "tdiff": 5,"time":20},{"temp":70, "tdiff": 5, "time":10}]};
        }
        else{
          $scope.receta = {"nombre":"STOUT", "fases":[{"temp":50, "tdiff": 5, "time":60},{"temp":60, "tdiff": 5,"time":20},{"temp":70, "tdiff": 5, "time":10},{"temp":70, "tdiff": 5, "time":10},{"temp":70, "tdiff": 5, "time":10},{"temp":70, "tdiff": 5, "time":10},{"temp":70, "tdiff": 5, "time":10}]};
        }
        $('#recipe_form').show();
      };

      $scope.saveRecipe=function(){
        //OBVIOUS TODO: POST DATA TO SERVER
        $window.alert($scope.receta.nombre);
      };

      $scope.deleteRecipe=function(recetaNombre){
        //OBVIOUS TODO: POST DATA TO SERVER
        $window.alert(recetaNombre);
      };

      $scope.listRecipes=function(){
        
      };

      $scope.supervision=function(){
        
      };      
     
    }]);
}(window.angular));