;(function(ng) {
  'use strict';

  ng.module('process-monitoring')
    .factory('RecipeDAO', ['$window','$http',function($window,$http) {

    	/***  FUNCIONES   ***/
    	function getRecipesSuccess(data, status, headers, config) {
    		return data.recipes;
    	};

    	function getRecipesFail(data, status, headers, config) {
    		$window.alert("No se han podido recuperar los nombres de las recetas");
    		return [];
    	};
    	function getRecipeSuccess(data, status, headers, config) {
    		return data.recipe;
    	};

    	function getRecipeFail(data, status, headers, config) {
    		$window.alert("No se ha podido recuperar la receta");
    		return {};
    	};
    	function deleteRecipeSuccess(data, status, headers, config) {
    		$window.alert("Receta borrada con éxito");
    	};

    	function deleteRecipeFail(data, status, headers, config) {
    		$window.alert("No se ha podido borrar la receta");
    	};
    	function saveRecipeSuccess(data, status, headers, config) {
    		$window.alert("Receta guardada con éxito");
    	};

    	function saveRecipeFail(data, status, headers, config) {
    		$window.alert("No se ha podido guardar la receta");
    	};
    	function getLogsSuccess(data, status, headers, config) {
    		return data.logs;
    	};

    	function getLogsFail(data, status, headers, config) {
    		$window.alert("No se ha podido obtener la lista de logs");
    		return [];
    	};
    	/***  FUNCIONES   ***/


    	var api = {
    		getRecipeName : function(callbackSuccess, callbackFail, recipeName){
    			return $http.get('/api/v1/recipe/name',{
    				name : recipeName
    			}).then(callbackFail,callbackSuccess);
    		},
    		getRecipesNames : function(){
    			return $http.get('/api/v1/recipe/names').then(getRecipesSuccess,getRecipesFail);
    		},
    		getRecipe : function(recipeName){
    			return $http.get('/api/v1/recipe/',{
    				name : recipeName
    			}).then(getRecipeSuccess,getRecipeFail);
    		},
    		deleteRecipe : function(recipeName){
    			return $http.delete('/api/v1/recipe/',{
    				name : recipeName
    			}).then(deleteRecipeSuccess,deleteRecipeFail);
    		},
    		saveRecipe : function(recipe){
    			return $http.put('/api/v1/recipe/',{
    				recipe : recipe
    			}).then(saveRecipeSuccess,saveRecipeFail);
    		},
    		getLog : function(logName){
    			//TODO
    			return;
    		},
    		getLogs : function(){
    			return $http.get('/api/v1/logs/').then(getLogsSuccess,getLogsFail);
    		}
    	};

		return api;
	}
  ]);
}(window.angular));