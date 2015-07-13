/// <reference path="../app/pages/titlePage.js" />
/// <reference path="../app/pages/titlePage.js" />
/*global window */
(function (window, angular) {
    'use strict';

    angular
        .module(window.appName)
        .controller('titleCtrl', ['$scope',   'viewSlideIndex', 'homeServiceModel',
                       function ($scope,   viewSlideIndex, homeServiceModel) {
  
                           $scope.Page = homeServiceModel.self.SelectedPage;
                            
                           
                           $scope.slideView = function (index, url) {
                               viewSlideIndex.slideView(index, url);
                           };
                           
                           $scope.getImage = function (url) {
                               return window.serviceLink + url;
                           };

                            
                           //http://blog.oxrud.com/posts/creating-youtube-directive/
                           $scope.showVideo = function(link) {
                               $scope.yt.videoid = link;
                              // $scope.$apply();
                           };


                           $scope.yt = {
                               width: 600,
                               height: 480,
                               videoid: "M7lc1UVf-VE",
                           };

                           $scope.closevideo = function() {

                               $("iframe").each(function() {

                                   var src = $(this).attr('src');
                                   $(this).attr('src', src);
                               });
                           };

                       }]);

}(window, window.angular));