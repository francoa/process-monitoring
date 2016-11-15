;(function(ng) {
  'use strict';

  ng.module('process-monitoring')
    .factory('RecipeDAO', ['$window','$http', '$q', function($window,$http,$q) {

    	/***  FUNCIONES   ***/
    	function getRecipesSuccess(data, status, headers, config) {
    		return data.recipes;
    	};

    	function getRecipesFail(data, status, headers, config) {
    		$window.alert("No se han podido recuperar los nombres de las recetas");
    		return [];
    	};

    	function deleteRecipeSuccess(data, status, headers, config) {
    		$window.alert("Receta borrada con éxito");
    	};
    	function deleteRecipeFail(data, status, headers, config) {
    		$window.alert("No se ha podido borrar la receta");
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
    		getRecipeName : function(recipeName){
				/*return $q(function(resolve, reject) {
    				$http.get('/api/v1/recipe/name',{
    					name : recipeName
    				}).then(function(){reject();},function(){resolve();});
    			});*/
                return $q(function(resolve,reject){
                    resolve();
                });
    		},
    		getRecipesNames : function(){
    			//return $http.get('/api/v1/recipe/names').then(getRecipesSuccess,getRecipesFail);
    			return ["Receta 1", "Receta 2", "Receta 3"];
    		},
    		getRecipe : function(recipeName){
    			/*return $q(function(resolve,reject){
                    $http.get('/api/v1/recipe/',{
    				    name : recipeName
    			     }).then(function(){resolve(data.recipe);},function(){reject();});
                 });*/
    			return $q(function(resolve,reject){
                    resolve({"Nombre":"Receta","Instrucciones":[
        			{"id":1, "msg":"Calentar agua","autom":false, "detalle":"Encender el mechero hasta el herbor", "img": undefined, "fases":[], "numFases":0},
        			{"id":0, "msg":"Colocar bombas para trasvase de agua","autom":true, "detalle":"Se debe abir esta valvula primero", "img": "/static/common/images/valvula1.jpg","fases":[{"temp":12, "time":12, "tdiff":12},{"temp":12, "time":12, "tdiff":12}], "numFases":2}
        			]});
                });
    		},
    		deleteRecipe : function(recipeName){
    			/*return $http.delete('/api/v1/recipe/',{
				    name : recipeName
			    }).then(deleteRecipeSuccess,deleteRecipeFail);*/
    		},
    		saveRecipe : function(recipe){
    			/*return $q(function(resolve,reject){
                    $http.put('/api/v1/recipe/',{
    				    recipe : recipe
    			    }).then(function(){resolve();},function(){reject();});
                });*/
                return $q(function(resolve,reject){
                    resolve();
                });
    		},
    		getLog : function(logName){
    			//TODO
    			return;
    		},
    		getLogs : function(){
    			//return $http.get('/api/v1/logs/').then(getLogsSuccess,getLogsFail);
    			return [{"date":"2016 05 15", "name":"Cook1"},{"date":"2016 06 15", "name":"Cook2"},{"date":"2016 05 03", "name":"Cook3"},{"date":"2016 05 30", "name":"Cook4"}];
    		}
    	};

		return api;
	}
  ]);
}(window.angular));