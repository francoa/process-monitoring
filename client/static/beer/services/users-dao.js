;(function(ng) {
  'use strict';

  ng.module('process-monitoring')
    .factory('UsersDAO', ['$window', '$cookies', '$http',function($window,$cookies,$http) {

      $('#input-modal').on('shown.bs.modal', function() {
        $('#textInputModal').focus();
      });

      /***  FUNCIONES   ***/
      var cookieName = 'BeerCookies';

      function registerSuccessFn(data) {
        $window.alert("El usuario ha sido registrado con éxito.");
      };

      function registerErrorFn(data) {
        $window.alert("No se ha podido registrar el usuario. " + data.statusText);
      };

      function loginSuccessFn(data) {
        api.setAuthenticatedAccount(data.data);
        api.redirect();
      };

      function loginErrorFn(data) {
        $window.alert("Usuario o contraseña incorrectas. Verifique sus datos. " + data.statusText)
      };

      function logoutSuccessFn(data) {
        api.unauthenticate();
        $window.location = '/';
      };

      function logoutErrorFn(data) {
        $window.alert("Error en logout. " + data.statusText)
      };

      function updateSuccessFn(data) {
        $window.alert("Cambios realizados con éxito.")
      };

      function updateErrorFn(data) {
        $window.alert("Error en los cambios. " + data.statusText)
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
              admin: user.manager
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
              new_password: user.newPass
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
          return account.admin;
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
            if(account.admin)
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
        },
        getUsers : function(){
          return $http.get('/api/users/accounts');
        },
        deleteUser : function(userName, pass){
          return $http.post('api/users/accounts/delete',{username:userName,my_pass:pass});
        }
      };

      return api;
    }
  ]);
}(window.angular));
