'use strict';

describe('beers.controller', function() {
    var _scope, _Beer, _httpBackend, _logMock;
    var CONTROLLER_NAME = 'BeerController as ctrl';
    var URL_GET_ALL = '/api/beers';
    var URL_CREATE_BEER = '/api/beers';
    var URL_DELETE_BEER = '/api/beers/';

    beforeEach(module('process-monitoring'));

    beforeEach(inject(function($injector) {
        _scope = $injector.get('$rootScope').$new();
        _httpBackend = $injector.get('$httpBackend');
        _logMock = $injector.get('$log');
        _Beer = $injector.get('Beer');
    }));

    describe('init', function() {
        it('should be initialized correctly', inject(function($controller) {
            $controller(CONTROLLER_NAME, {$scope: _scope});
        }));

        it('should have beer as the instanceof Beer', inject(function($controller) {
            $controller(CONTROLLER_NAME, {$scope: _scope});

            expect(_scope.ctrl.beer instanceof _Beer).toBeTruthy();
        }));

        it('should have beers as an empty array', inject(function($controller) {
          $controller(CONTROLLER_NAME, {$scope: _scope});

          expect(window.angular.equals(_scope.ctrl.beers, [])).toBeTruthy();
        }));
    });

    describe('onLoad', function() {
        it('should fill the beers array with the server response', inject(function($controller) {
            var _response = [{beerMessage: 'hello', createdAt: Date.now()}, {beerMessage: 'oh, hey!', createdAt: Date.now()}];

            _httpBackend.expectGET(URL_GET_ALL).respond(_response);

            $controller(CONTROLLER_NAME, {$scope: _scope});

            _httpBackend.flush();

            expect(window.angular.equals(_scope.ctrl.beers, _response)).toBeTruthy();
        }));
    });

    describe('createBeer', function() {
        it('should try to createBeer, but server returns error - 400', inject(function($controller) {
            spyOn(_logMock, 'error').and.callFake(window.angular.noop);

            /* jshint -W055 */
            var _beer = new _Beer();
            _beer.beerMessage = 'abcdef';

            _httpBackend.expectGET(URL_GET_ALL).respond(200);
            _httpBackend.expectPOST(URL_CREATE_BEER, _beer).respond(400);

            $controller(CONTROLLER_NAME, {$scope: _scope});

            _scope.ctrl.createBeer(_beer);

            _httpBackend.flush();

            expect(_logMock.error).toHaveBeenCalled();
        }));

        it('should createBeer correctly', inject(function($controller) {
          var _response = {_id: 'abcdef123', beerMessage: 'abcdef', createdAt: Date.now()};

          /* jshint -W055 */
          var _beer = new _Beer();
          _beer.beerMessage = 'abcdef';

          _httpBackend.expectGET(URL_GET_ALL).respond(200);
          _httpBackend.expectPOST(URL_CREATE_BEER, _beer).respond(200, _response);

          $controller(CONTROLLER_NAME, {$scope: _scope});

          _scope.ctrl.createBeer(_beer);

          _httpBackend.flush();

          expect(window.angular.equals(_scope.ctrl.beers[0], _response)).toBeTruthy();
          expect(_scope.ctrl.beer.beerMessage).toBeNull();
        }));
    });

    describe('deleteBeer', function() {
      it('should try to deleteBeer, but server returns error - 400', inject(function($controller) {
        var _id = '1';
        var _response = [{_id: 1}];

        spyOn(_logMock, 'error').and.callFake(window.angular.noop);

        _httpBackend.expectGET(URL_GET_ALL).respond(200, _response);
        _httpBackend.expectDELETE(URL_DELETE_BEER + _id).respond(400);

        $controller(CONTROLLER_NAME, {$scope: _scope});

        _scope.ctrl.deleteBeer(_id);

        _httpBackend.flush();

        expect(_logMock.error).toHaveBeenCalled();
      }));

      it('should deleteBeer correctly', inject(function($controller) {
        var _id = '1';
        var _responseGET = [{_id: '0'}, {_id: '1'}];
        var _responseGETAfterDelete = [{_id: '0'}];

        _httpBackend.expectGET(URL_GET_ALL).respond(200, _responseGET);
        _httpBackend.expectDELETE(URL_DELETE_BEER + _id).respond(200);
        _httpBackend.expectGET(URL_GET_ALL).respond(200, _responseGETAfterDelete);

        $controller(CONTROLLER_NAME, {$scope: _scope});

        _scope.ctrl.deleteBeer(_id);

        _httpBackend.flush();

        expect(_scope.ctrl.beers.length).toBe(1);
      }));
    });
});
