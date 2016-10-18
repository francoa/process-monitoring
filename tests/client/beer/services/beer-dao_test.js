'use strict';

describe('beer.dao', function() {
  var _rootScope, _scope, _httpBackend, _BeerDAO, _Beer;
  var URL_GET_ALL = '/api/beers';
  var URL_CREATE_BEER = '/api/beers';
  var URL_DELETE_BEER = '/api/beers/';

  beforeEach(module('process-monitoring'));

  beforeEach(inject(function($injector) {
    _rootScope = $injector.get('$rootScope');
    _scope = _rootScope.$new();
    _httpBackend = $injector.get('$httpBackend');
    _Beer = $injector.get('Beer');
    _BeerDAO = $injector.get('BeerDAO');
  }));

  describe('getAll', function() {
    describe('error', function() {
      it('should try to get beers from the server, but the server return an error', function() {
        var _response = {
          someError: ':('
        };

        _httpBackend.expectGET(URL_GET_ALL).respond(400, _response);

        var _onSuccess = function() {
          expect(true).toBeFalsy(); // should not come here
        };

        var _onError = function(error) {
          expect(error).toBeDefined();
          expect(error.data.someError).toEqual(_response.someError);
        };

        _BeerDAO
          .getAll()
          .then(_onSuccess)
          .catch(_onError);

        _httpBackend.flush();
      });
    });

    describe('success', function() {
      it('should try get beers from the server, server returns OK', function() {
        var _response = [{
          an: 'array',
          of: 'beers'
        }];

        _httpBackend.expectGET(URL_GET_ALL).respond(200, _response);

        var _onSuccess = function(beers) {
          expect(window.angular.equals(_response.an, beers.an));
          expect(window.angular.equals(_response.of, beers.of));
        };

        var _onError = function() {
          expect(true).toBeFalsy(); // should not come here
        };

        _BeerDAO
          .getAll()
          .then(_onSuccess)
          .catch(_onError);

        _httpBackend.flush();
      });
    });
  });

  describe('createBeer', function() {
    it('should return the promise as an error - object is not a valid instanceof Beer', function() {
      /* jshint -W055 */
      var _invalidBeer = new _Beer();
      _invalidBeer.beerMessage = '';

      var _onSuccess = function() {
        expect(true).toBeFalsy();
      };

      var _onError = function(error) {
        expect(error).toBeDefined();
        expect(error instanceof TypeError).toBeTruthy();
        expect(error.message).toEqual('Invalid beer to be created.');
      };

      _BeerDAO
        .createBeer(_invalidBeer)
        .then(_onSuccess)
        .catch(_onError);

      _rootScope.$digest();
    });

    it('should return the promise as an error - server returns an error', function() {
      /* jshint -W055 */
      var _validBeer = new _Beer();
      _validBeer.beerMessage = 'abcdef';

      _httpBackend.expectPOST(URL_CREATE_BEER, _validBeer).respond(400, {
        someError: 'here'
      });

      var _onSuccess = function() {
        expect(true).toBeFalsy();
      };

      var _onError = function(error) {
        expect(error).toBeDefined();
        expect(error.data.someError).toEqual('here');
      };

      _BeerDAO
        .createBeer(_validBeer)
        .then(_onSuccess)
        .catch(_onError);

      _httpBackend.flush();
    });

    it('should return the just created beer', function() {
      var _response = {
        _id: 'abcdef123',
        beerMessage: 'abcdef',
        createdAt: Date.now()
      };

      /* jshint -W055 */
      var _validBeer = new _Beer();
      _validBeer.beerMessage = 'abcdef';

      _httpBackend.expectPOST(URL_CREATE_BEER, _validBeer).respond(200, _response);

      var _onSuccess = function(beer) {
        expect(window.angular.equals(beer, _response));
      };

      var _onError = function() {
        expect(true).toBeFalsy();
      };

      _BeerDAO
        .createBeer(_validBeer)
        .then(_onSuccess)
        .catch(_onError);

      _httpBackend.flush();
    });
  });

  describe('deleteBeer', function() {
    it('should return with an error, id not informed', function() {
      var _id = null;

      var _onSuccess = function() {
        expect(true).toBeFalsy();
      };

      var _onError = function(error) {
        expect(error).toBeDefined();
        expect(error instanceof TypeError).toBeTruthy();
        expect(error.message).toEqual('Invalid id for deletion.');
      };

      _BeerDAO
        .deleteBeer(_id)
        .then(_onSuccess)
        .catch(_onError);

      _rootScope.$digest();
    });

    it('should try to delete beer, but server returns error - 400', function() {
      var _id = 'abc';

      _httpBackend.expectDELETE(URL_DELETE_BEER + _id).respond(400);

      var _onSuccess = function() {
        expect(true).toBeFalsy();
      };

      var _onError = function() {
        expect(true).toBeTruthy();
      };

      _BeerDAO
        .deleteBeer(_id)
        .then(_onSuccess)
        .catch(_onError);

      _httpBackend.flush();
    });

    it('should delete beer correctly', function() {
      var _id = 'abc';

      _httpBackend.expectDELETE(URL_DELETE_BEER + _id).respond(200);

      var _onSuccess = function() {
        expect(true).toBeTruthy();
      };

      var _onError = function() {
        expect(true).toBeFalsy();
      };

      _BeerDAO
        .deleteBeer(_id)
        .then(_onSuccess)
        .catch(_onError);

      _httpBackend.flush();
    });
  });
});
