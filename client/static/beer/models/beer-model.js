// Model: The data shown to the user in the view and with which the user interacts
/*;(function(ng) {
  'use strict';

  ng.module('process-monitoring')
    .factory('Step', [function() {
      var Step = function(beer) {
        this.beerMessage = null;
        ng.extend(this, beer);
      };

      var MIN_ACCEPTED_LENGTH = 5;

      Step.prototype.isValid = function() {
        var _isDefined = ng.isDefined(this.beerMessage);
        var _isString = ng.isString(this.beerMessage);
        var _isBigEnough = (_isDefined && _isString) ? this.beerMessage.length >= MIN_ACCEPTED_LENGTH : false;

        return _isDefined && _isString && _isBigEnough;
      };

      return Step;
    }]);

}(window.angular));


// .factory('User', function (Organisation) {
 
//   /**
//    * Constructor, with class name
//    */
//   function User(firstName, lastName, role, organisation) {
//     // Public properties, assigned to the instance ('this')
//     this.firstName = firstName;
//     this.lastName = lastName;
//     this.role = role;
//     this.organisation = organisation;
//   }
 
//   /**
//    * Public method, assigned to prototype
//    */
//   User.prototype.getFullName = function () {
//     return this.firstName + ' ' + this.lastName;
//   };
 
//   /**
//    * Private property
//    */
//   var possibleRoles = ['admin', 'editor', 'guest'];
 
//   /**
//    * Private function
//    */
//   function checkRole(role) {
//     return possibleRoles.indexOf(role) !== -1;
//   }
 
//   /**
//    * Static property
//    * Using copy to prevent modifications to private property
//    */
//   User.possibleRoles = angular.copy(possibleRoles);
 
//   /**
//    * Static method, assigned to class
//    * Instance ('this') is not available in static context
//    */
//   User.build = function (data) {
//     if (!checkRole(data.role)) {
//       return;
//     }
//     return new User(
//       data.first_name,
//       data.last_name,
//       data.role,
//       Organisation.build(data.organisation) // another model
//     );
//   };
 
//   /**
//    * Return the constructor function
//    */
//   return User;
// })