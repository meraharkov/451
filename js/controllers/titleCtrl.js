/*global window */
(function (window, angular) {
    'use strict';

    angular
        .module(window.appName)
        .controller('titleCtrl', ['$scope', '$timeout', function ($scope, $timeout) {

            $scope.popapWidth = $(window).innerWidth();
            
            $scope.popapHeight = $(window).innerHeight();
           
            
            $scope.changeRotateVideoPopap = function () {
                
                var className = null;
                
                var width = $(window).innerWidth();
                var height = $(window).innerHeight();

                if (width < height) {
                    className = "rotateVideo90";
                    $scope.popapWidth = height;
                    $scope.popapHeight = width;

                } else {
                    $scope.popapWidth = width;
                    $scope.popapHeight = height;
                    className = "rotateVideo";
                }
                
                return className;
            };

            window.onresize = function (event) {
               
                $scope.$apply($scope.changeRotateVideoPopap());
            };

         /*   $timeout(function() {
                $('#title-page')
                         .prop('class', 'modal fade') // revert to default
                         .addClass($(this).data('direction'));
                $('#title-page').modal('show');
            }, 500);*/
        } ]);

}(window, window.angular));