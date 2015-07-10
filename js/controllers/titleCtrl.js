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


                            

                           $scope.showVideo = function(link) {
                               loadIframeYoutubePlayer(); 
                               screen.lockOrientation('landscape');
                           };

                            
                       }]);

}(window, window.angular));