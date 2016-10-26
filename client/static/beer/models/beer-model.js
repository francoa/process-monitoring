// Model: The data shown to the user in the view and with which the user interacts
/*;(function(ng) {
  'use strict';

  ng.module('process-monitoring')
    .factory('Beer', [function() {
      var Beer = function(beer) {
        this.beerMessage = null;
        ng.extend(this, beer);
      };

      var MIN_ACCEPTED_LENGTH = 5;

      Beer.prototype.isValid = function() {
        var _isDefined = ng.isDefined(this.beerMessage);
        var _isString = ng.isString(this.beerMessage);
        var _isBigEnough = (_isDefined && _isString) ? this.beerMessage.length >= MIN_ACCEPTED_LENGTH : false;

        return _isDefined && _isString && _isBigEnough;
      };

      return Beer;
    }]);

}(window.angular));
