'use strict';

describe('Beer', function() {
  var _Beer;

  beforeEach(module('process-monitoring'));

  beforeEach(inject(function($injector) {
    _Beer = $injector.get('Beer');
  }));

  describe('instance', function() {
    it('should have the right prop for the instance', function() {
      /* jshint -W055 */
      var _beer = new _Beer();

      expect(_beer.beerMessage).toBeNull();
    });
  });

  describe('isValid', function() {
    it('should return false, invalid something2do', function() {
      /* jshint -W055 */
      var _beer = new _Beer();

      expect(_beer.isValid()).toBeFalsy();
    });

    it('should return true, new instance is valid', function() {
      /* jshint -W055 */
      var _beer = new _Beer();
      _beer.beerMessage = 'I have to walk the dog.';

      expect(_beer.isValid()).toBeTruthy();
    });
  });
});
