/*global window */
(function (window, angular, $) {
    'use strict';

    angular
        .module(window.appName)
        .directive('slidehome', function () {

            return {
                restrict: 'A',

                link: function (scope, element) {
               
                    $('#home-page')
                       .prop('class', 'modal fade') // revert to default
                       .addClass("left");
                    $('#home-page').modal('show');
                    
                }
            };
        });

}(window, window.angular, window.jQuery));