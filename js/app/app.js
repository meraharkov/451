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
        var ref = window.open('https://instagram.com/', '_system', 'location=no');       
    });

    $("#twitter").click(function () {
        var ref = window.open('https://twitter.com/sourceseek', '_system', 'location=no');    
    });

    $("#tumbrl").click(function () {
        var ref = window.open('https://www.tumblr.com/', '_system', 'location=no');      
    });


    $('#menuModal').on('shown.bs.modal', function (e) {
  /*      alert("modal open");*/
     /*   $(document.body).css("overflow", "hidden");*/
        $(document.body).addClass("remove-scroll");
    });

    $('#menuModal').on('hidden.bs.modal', function (e) {
       /* alert("modal close");*/

        $(document.body).removeClass("remove-scroll");
       /* $(document.body).removeAttr('class');*/
    });

});