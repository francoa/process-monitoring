;(function(ng) {
  'use strict';

  ng.module('process-monitoring')
    .factory('BeerDAO', [
      '$q',
      'Beer',
      'BeerResource',
      function($q, Beer, BeerResource) {
        var BeerDAO = function() {};

        BeerDAO.prototype.getAll = function() {
          var _onSuccess = function(beers) {
            // do something with the response from the server, like extending a model or something

            return beers; // this will be returned as a resolved promise
          };

          var _onError = function(error) {
            // do something with the error, like making it more readable or something
            return $q.reject(error); // this will be returned as a rejected promise
          };

          return BeerResource
            .query()
            .$promise
            .then(_onSuccess)
            .catch(_onError);
        };

        BeerDAO.prototype.createBeer = function(beer) {
          if (!ng.isObject(beer) || !(beer instanceof Beer) || !beer.isValid()) {
            return $q.reject(new TypeError('Invalid beer to be created.'));
          }

          var _onSuccess = function(beer) {
            return new Beer(beer);
          };

          var _onError = function(error) {
            return $q.reject(error);
          };

          return BeerResource
            .save(beer)
            .$promise
            .then(_onSuccess)
            .catch(_onError);
        };

        BeerDAO.prototype.deleteBeer = function(id) {
          if (!ng.isString(id)) {
            return $q.reject(new TypeError('Invalid id for deletion.'));
          }

          var _onSuccess = function() {
            return;
          };

          var _onError = function(error) {
            return $q.reject(error);
          };

          return BeerResource
            .delete({
              id: id
            })
            .$promise
            .then(_onSuccess)
            .catch(_onError);
        };

        return new BeerDAO();
      }
    ]);

}(window.angular));
