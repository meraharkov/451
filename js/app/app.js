/*global window*/
(function (window, angular) {
    'use strict';

    window.appName = window.appName || 'comix';
 //   window.slideTo = "slide-right";
    
    angular
        .module(window.appName, ['ngRoute', 'ngAnimate'  ])
        .config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {

            /*  
            ORIGINAL ROUTE
            $routeProvider
                .when('/', { templateUrl: 'js/partials/home.html', controller: 'homeCtrl' })
                .when('/title', { templateUrl: 'js/partials/title.html', controller: 'titleCtrl' })
                .when('/about', { templateUrl: 'js/partials/about.html'  })
                .otherwise({ redirectTo: '/' });*/


                /*     
                $routeProvider.when('/', {
                    template: '<div style="background: green">Root Route</div>'
                })
                        .when('/routeA', {
                            template: '<div style="background:blue" >Route A</div>'
                        })
                        .when('/routeB', {
                            template: '<div style="background:red">Route B</div>'
                        })
                        .otherwise({
                            redirectTo: '/'
                        });*/
                
/*
                $routeProvider.when('/pg1', {
                    templateUrl: 'js/partials/home.html',
                    controller: 'AppCtrl'
                });
                $routeProvider.when('/pg2', {
                    templateUrl: 'js/partials/title.html',
                    controller: 'AppCtrl'
                });
                $routeProvider.when('js/partials/about.html', {
                    templateUrl: 'pg3.html',
                    controller: 'AppCtrl'
                });
                $routeProvider.otherwise({
                    redirectTo: '/pg1'
                });*/
            

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