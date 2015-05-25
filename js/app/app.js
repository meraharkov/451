/*global window*/
(function (window, angular) {
    'use strict';

    window.appName = window.appName || 'comix';

    angular
        .module(window.appName, ['ngRoute'])
        .config(['$routeProvider',
            function ($routeProvider) {

                $routeProvider
               .when('/index', { templateUrl: 'js/partials/home.html', controller: 'mainCtrl' })
                .when('/title', { templateUrl: 'js/partials/title.html', controller: 'mainCtrl' })
               .otherwise({ redirectTo: '/index' });

            }]);

}(window, window.angular));


$(document).ready(function () {

    $('.menu-btn').click(function () {
        $('.modal')
            .prop('class', 'modal fade') // revert to default
            .addClass($(this).data('direction'));
        $('.modal').modal('show');
    });
});