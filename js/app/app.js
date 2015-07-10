/*global window*/
(function (window, angular) {
    'use strict';

    window.appName = window.appName || 'comix';
    window.serviceLink = "http://web421.newlinetechnologies.net/";
   // window.serviceLink =  "http://localhost:50038/";

    angular
        .module(window.appName, ['ngRoute', 'ngAnimate'  ])
        .config(['$routeProvider', '$locationProvider',  
            function ($routeProvider, $locationProvider ) {

                $routeProvider
                .when('/', { templateUrl: 'js/partials/home.html' })
                .when('/title', { templateUrl: 'js/partials/title.html'})
                .when('/about', { templateUrl: 'js/partials/about.html' })
                .otherwise({ redirectTo: '/' });
            
               $locationProvider.html5Mode(false); 

            }]);

}(window, window.angular));


$(document).ready(function () {


    $('.main-menu-btn').click(function () {
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
        var ref = window.open('https://instagram.com/', '_system', 'location=no');       
    });

    $("#twitter").click(function () {
        var ref = window.open('https://twitter.com/sourceseek', '_system', 'location=no');    
    });

    $("#tumbrl").click(function () {
        var ref = window.open('https://www.tumblr.com/', '_system', 'location=no');      
    });

    
    function preventDefault(e) {
        e.preventDefault();
    };
    
    $('#menuModal').on('shown.bs.modal', function (e) {
  
        document.addEventListener('touchmove', preventDefault, false);

        $(document.body).addClass("remove-scroll");
  
    });

    $('#menuModal').on('hidden.bs.modal', function (e) {
    
        document.removeEventListener('touchmove', preventDefault, false);

        $(document.body).removeClass("remove-scroll");
    
    });
    
  
    
});