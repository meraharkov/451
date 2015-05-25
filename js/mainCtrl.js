/*global window */
(function (window, angular) {
    'use strict';

    angular
        .module(window.appName)
        .controller('mainCtrl', ['$scope', 
            function ($scope) {
                $scope.test = 1;
         
            }]);
}(window, window.angular));