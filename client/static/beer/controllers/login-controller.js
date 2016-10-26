;(function(ng) {
  'use strict';

  ng.module('process-monitoring')
    .controller('LoginController', ['$log','$scope','$window','$http', function($log,$scope,$window,$http) {
      var self = this;

      $scope.searchGoogle=function(keywords){
        keywords = keywords.replace(" ","+");
        $window.location.href='https://www.google.com.ar/search?q='+keywords;
      };

      $scope.login=function(user){
        var path = '/login';
        $http.post(path,user)
            .success(function (data){
              //OBVIOUS TODO: AUTH
              $window.location.href='http://localhost:8000/admin'
        });
      };

    }]);
}(window.angular));
