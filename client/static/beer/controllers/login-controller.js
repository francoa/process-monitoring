;(function(ng) {
  'use strict';

  ng.module('process-monitoring')
    .controller('LoginController', ['$scope','$window','UsersDAO', function($scope,$window,UsersDAO) {
      var self = this;
      $scope.UsersDAO = UsersDAO;

      var activate = function(){
        if (UsersDAO.isAuthenticated())
          UsersDAO.redirect();
      };
      activate();

      $scope.searchGoogle=function(keywords){
        keywords = keywords.replace(" ","+");
        $window.location.href='https://www.google.com.ar/search?q='+keywords;
      };

      $scope.popupModal=function(name){
        $("#"+name).modal();
      };

    }]);
}(window.angular));
