/*global window */
(function (window, angular) {
    'use strict';

    angular
        .module(window.appName)
        .controller('mainCtrl', ['$scope', '$location', 'viewSlideIndex', function ($scope, $location, viewSlideIndex) {

            $scope.isHomePage = false;
            $scope.isTitlePage = false;
            

            $scope.slideView = function(index, url) {
                 
                var scrolled = window.pageYOffset || document.documentElement.scrollTop;
                
                $('.sroll-item').css("position", 'absolute');
                $('.sroll-item').css("margin-top", scrolled + "px");
                

                if (viewSlideIndex.getViewIndex() > index) {
                    $scope.slideDir = 'slide-right';
                } else {
                    $scope.slideDir = 'slide-left';
                }
                ;
                viewSlideIndex.setViewIndex(index);
                $location.url(url);
            };

         /*   var scrollFn = function() {
                var scrolled = window.pageYOffset || document.documentElement.scrollTop;
                //  document.getElementById('value-scroll').innerHTML = scrolled + 'px'; // <div id="value-scroll" style="position: fixed; width: 200px; height: 100px; background: white;   z-index: 1030;"></div>
                $('.sroll-item').css("margin-top", scrolled + "px");

            };

            $scope.$on('$viewContentLoaded', function () {
                
                /*$("#home-page").on("scroll", scrollFn);#1#
               // $("#home-page").bind("scroll", scrollFn);

                var content = $("#home-page");
                
                $(window, content).scroll(scrollFn);

            });*/

        } ]);

}(window, window.angular));