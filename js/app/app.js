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
     
  /*  // set to either landscape
    screen.lockOrientation('landscape');

    // allow user rotate
    screen.unlockOrientation();

    // access current orientation
   /* console.log('Orientation is ' + screen.orientation);#1#
    alert('Orientation is ' + screen.orientation);
    
  
    function onDeviceReady() {
        alert("onDeviceReady")
        var so = cordova.plugins.screenorientation;
        so.setOrientation(so.Orientation.LANDSCAPE);
    }
    document.addEventListener("deviceready", onDeviceReady, false);*/
  
});