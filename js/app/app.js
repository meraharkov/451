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
                .when('/title', { templateUrl: 'js/partials/title.html', controller: 'titleCtrl' })
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

    $("#facebook").click(function () {
        var ref = window.open('https://www.facebook.com/SourceSeek', '_system', 'location=no');       // loads in the system browser  
    });

    $("#instagramm").click(function () {
        var ref = window.open('https://www.facebook.com/SourceSeek', '_system', 'location=no');       // loads in the system browser  
    });

    $("#twitter").click(function () {
        var ref = window.open('https://twitter.com/sourceseek', '_system', 'location=no');       // loads in the system browser  
    });

    $("#tumbrl").click(function () {
        var ref = window.open('https://twitter.com/sourceseek', '_system', 'location=no');       // loads in the system browser 
    });


    document.addEventListener('deviceready', function () {
        // cordova.plugins.email is now available

        cordova.plugins.email.isAvailable(function (isAvailable) {
                    alert('Service is not available' + isAvailable);
                }
        );
    }, false);

});