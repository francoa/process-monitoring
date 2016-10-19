/*;(function(ng) {
  'use strict';

  ng.module('process-monitoring')
    .controller('LoginController', [
      '$log',
      'Beer',
      'BeerDAO',
      function($log, Beer,BeerDAO) {
        var self = this;

        self.beer = new Beer();
        self.beers = [];

        self.createBeer = function(beer) {
          BeerDAO
            .createBeer(beer)
            .then(function(newBeer) {
              self.beers.push(newBeer);
              self.beer = new Beer();
            })
            .catch($log.error);
        };

        function _getAll() {
          return BeerDAO
            .getAll()
            .then(function(beers) {
              self.beers = beers;
              return self.beers;
            })
            .catch($log.error);
        }

        self.deleteBeer = function(id) {
          BeerDAO
            .deleteBeer(id)
            .then(function() {
              return _getAll();
            })
            .catch($log.error);
        };

        _getAll();

        return self;
      }
    ]);
}(window.angular));
