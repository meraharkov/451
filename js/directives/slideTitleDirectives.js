/*global window */
(function (window, angular, $) {
    'use strict';

    angular
        .module(window.appName)
        .directive('slidetitle', function () {

            return {
                restrict: 'A',

                link: function (scope, element) {
               
               /*         $('#title-page')
                       .prop('class', 'modal fade') // revert to default
                       .addClass($(this).data('direction'));
                        $('#title-page').modal('show');*/
                    
                }
            };
        });

}(window, window.angular, window.jQuery));