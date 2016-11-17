;(function(ng) {
  'use strict';

  ng.module('process-monitoring')
    .factory('UsersDAO', ['$window', '$cookies', '$http',function($window,$cookies,$http) {

      $('#input-modal').on('shown.bs.modal', function() {
        $('#textInputModal').focus();
      });

      /***  FUNCIONES   ***/
      var cookieName = 'authAcc';

      function registerSuccessFn(data, status, headers, config) {
        $window.alert("El usuario ha sido registrado con éxito.");
      };

      function registerErrorFn(data, status, headers, config) {
        $window.alert("No se ha podido registrar el usuario.");
      };

      function loginSuccessFn(data, status, headers, config) {
        api.setAuthenticatedAccount(data.data);
        api.redirect();
      };

      function loginErrorFn(data, status, headers, config) {
        $window.alert("Usuario o contraseña incorrectas. Verifique sus datos. "+ data)
      };

      function logoutSuccessFn(data, status, headers, config) {
        api.unauthenticate();
        $window.location = '/';
      };

      function logoutErrorFn(data, status, headers, config) {
        $window.alert("Error en logout.")
      };

      function updateSuccessFn(data, status, headers, config) {
        $window.alert("Cambios realizados con éxito.")
      };

      function updateErrorFn(data, status, headers, config) {
        $window.alert("Error en los cambios.")
      };
      /***  FUNCIONES   ***/


      var api = {
        logout : function(){
          return $http.post('/api/users/auth/logout/').then(logoutSuccessFn, logoutErrorFn);
        },
        login : function(user){
          return $http.post('/api/users/auth/login/', {
            username: user.username,
            password: user.password
          }).then(loginSuccessFn, loginErrorFn);
        },
        register : function(user){
          if(user.pass === user.pass2){
            return $http.post('/api/users/accounts/', {
              username: user.username,
              password: user.pass,
              manager: user.manager
            }).then(registerSuccessFn, registerErrorFn);
          }
          else
            $window.alert("Las contraseñas no coinciden");
        },
        cambiarContrasena : function(user){
          if(user.newPass === user.repeatPass){
            return $http.put('/api/users/accounts/', {
              username: user.username,
              password: user.oldPass,
              new_password: user.newPass,
              confirm_password: user.repeatPass
            }).then(updateSuccessFn, updateErrorFn);
          }
          else
            $window.alert("Las contraseñas no coinciden");
        },
        getAuthenticatedAccount : function() {
          if (!$cookies.get(cookieName))
            return;
          return JSON.parse($cookies.get(cookieName));
        },
        isAuthenticated : function() {
          return !!$cookies.get(cookieName);
        },
        isAdmin : function(){
          var account = JSON.parse($cookies.get(cookieName));
          return account.manager;
        },
        setAuthenticatedAccount : function(account) {
          $cookies.put(cookieName,JSON.stringify(account));
        },
        unauthenticate : function() {
          $cookies.remove(cookieName)
        },
        redirect : function() {
          try{
            var account = JSON.parse($cookies.get(cookieName));
            if(account.manager)
              $window.location = '/admin';
            else
              $window.location = '/monitor';
          }catch(err){
            $window.location = '/';  
          }
        },
        getUserName : function(){
          var account = JSON.parse($cookies.get(cookieName));
          return account.username;
        }
      };

      return api;
    }
  ]);
}(window.angular));
