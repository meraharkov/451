/*global window */
(function (window, angular) {
    'use strict';

    angular
        .module(window.appName)
        .constant('YT_event', {
            STOP:            0, 
            PLAY:            1,
            PAUSE:           2
        });
}(window, window.angular));