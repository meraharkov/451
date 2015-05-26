/*global window*/
(function (window, angular) {
    'use strict';

    window.appName = window.appName || 'comix';

    angular
        .module(window.appName, ['ngRoute'])
        .config(['$routeProvider',
            function ($routeProvider) {

                $routeProvider
               .when('/index', { templateUrl: 'js/partials/home.html' })
                .when('/title', { templateUrl: 'js/partials/title.html' })
               .otherwise({ redirectTo: '/index' });

            }]);

}(window, window.angular));


$(document).ready(function () {

    $('.menu-btn').click(function () {
        $('#menuModal')
            .prop('class', 'modal fade') // revert to default
            .addClass($(this).data('direction'));
        $('#menuModal').modal('show');
    });

    $('#bad-moon-menu-btn').click(function () {
        $('#menuModal').modal('hide');
    });
    
   /* window.plugins = {};
    window.plugins.statusBar = new StatusBar();
    
   var statusbar = window.plugins.statusBar;
    statusbar.hide();
    statusbar.show();
    statusbar.whiteTint();
    statusbar.blackTint();*/
    
});