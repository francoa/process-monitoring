;(function(ng) {
  'use strict';

  ng.module('process-monitoring')
    .factory('BeerResource', [
      '$resource',
      function($resource) {
        var _url = '/api/beers/:id';
        var _params = {};
        var _methods = {};

        return $resource(_url, _params, _methods);
      }
    ]);

}(window.angular));
