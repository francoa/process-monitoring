;(function(ng) {
  'use strict';

  ng.module('process-monitoring')
    .factory('UsersDAO', ['$window','$http',function($window,$http) {

      $('#input-modal').on('shown.bs.modal', function() {
        $('#textInputModal').focus();
      });

      var api = {
        logout : function(){
          //OBVIOUS TODO: AUTH
          $window.location.href='http://localhost:8000/';
        },
        cambiarContrasena : function(user){
          $window.alert("Cambio de contraseña");
        },
        login : function(user){
          var path = '/login';
          $http.post(path,user)
              .success(function (data){
                //OBVIOUS TODO: AUTH
                $window.location.href='http://localhost:8000/admin'
          });
        }

      };

      return api;
    }
  ]);
}(window.angular));
