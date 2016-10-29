;(function(ng) {
  'use strict';

    ng.module('process-monitoring').directive('keyBinding', function() {
            return function(scope, element, attrs) {
                element.bind("keydown keypress", function(event) {
                    if(event.which === Number(attrs.key)){
                        scope.$apply(function(){
                            scope.$eval(attrs.keyBinding, {'event': event});
                        });

                        event.preventDefault();
                    }
                });
            };
        });
}(window.angular));