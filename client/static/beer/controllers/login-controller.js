;(function(ng) {
  'use strict';

  ng.module('process-monitoring')
    .controller('LoginController', ['$scope','$window','$http', 'UsersDAO', function($scope,$window,$http,UsersDAO) {
      var self = this;
      $scope.UsersDAO = UsersDAO;

      $scope.searchGoogle=function(keywords){
        keywords = keywords.replace(" ","+");
        $window.location.href='https://www.google.com.ar/search?q='+keywords;
      };

      $scope.popupModal=function(name){
        $("#"+name).modal();
      };

    }]);
}(window.angular));
