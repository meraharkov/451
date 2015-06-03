/*global window */
(function (window, angular, $) {
    'use strict';

    angular
        .module(window.appName)
        .directive('slidetitle', function () {

            return {
                restrict: 'A',

                link: function (scope, element) {
               
                  /*  $('#sharedModal')
                       .prop('class', 'modal fade') // revert to default
                       .addClass("right");
                    $('#sharedModal').modal('show');*/
                    
                }
            };
        });

}(window, window.angular, window.jQuery));