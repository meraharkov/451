/*global window*/
(function (window, angular) {
    'use strict';

    window.appName = window.appName || 'comix';
/*
    angular
        .module(window.appName, ['ui.router', 'ngRoute'])
        .config(['$routeProvider', function ($routeProvider) {
          $routeProvider
                .when('/index',  { templateUrl: 'partials/home.html', controller: 'homeCtrl' })
                .when('/social', { templateUrl: 'partials/social.html', controller: 'homeCtrl' })
                 
                .otherwise({ redirectTo: '/index' });
        }]);*/

    angular
        .module(window.appName, ['ui.router'])
        .config(['$routeProvider',
            function ($routeProvider) {
                $routeProvider
        .when('/index', { templateUrl: 'partials/home.html', controller: 'mainCtrl' })
         
        .otherwise({ redirectTo: '/index' });
                 

            }
        ]);

}(window, window.angular));