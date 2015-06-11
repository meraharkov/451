﻿/*global window*/
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
    
    jQuery(document).on('webkitfullscreenchange', function (e) {

        alert("webkitfullscreenchange");

        if (!e.currentTarget.webkitIsFullScreen) {
            var so = cordova.plugins.screenorientation;
            so.setOrientation(so.Orientation.LANDSCAPE);
            alert("webkitfullscreenchange LANDSCAPE set");
            /*    so.setOrientation(so.Orientation.PORTRAIT);*/
        }
    });
    
    document.addEventListener('playing', function () {
        alert("play video");
        var so = cordova.plugins.screenorientation;
        so.setOrientation(so.Orientation.LANDSCAPE);
        alert(".Orientation.LANDSCAPE");
    }, false);
    
    function updateOrientation(e) {
        alert(e.orientation);
    }
    
    window.addEventListener("orientationchange", updateOrientation);

    function orientation(e) {
        alert(e.orientation);
    }

    document.addEventListener('orientationchange', orientation, false);

    function orientationHandler(event) {
        if (event.orientation) {
            if (event.orientation == 'portrait') {
                //do something
            }
            else if (event.orientation == 'landscape') {
                //do something
            }
        }
    }
    $(window).bind('orientationchange', orientationHandler);

});