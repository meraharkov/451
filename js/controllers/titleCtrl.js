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

                           $scope.player = {
                               width:    window.innerWidth + 1,     //'640',
                               height:   window.innerHeight + 1, //'390',
                               videoId: 'i9MHigUZKEM',
                               playerVars: {
                                    'autohide':1,
                                    'autoplay': 1,//start play by onload
                                   'controls': 0,
                                   'showinfo': 0,//hide title link about video on top iframe
                                    'modestbranding': 1, //hide YouTube logo
                                    'fs': 0, //hide full screen button           
                                    'enablejsapi': 1,//turn on APi Javascript 
                                    'playsinline': 0,//show video in full screen page
                                    'rel': 0 // don*t show other video after this video
                               },
                               videoParameters: {
                                   'startSeconds': 1
                               }
                           };
 
                           $scope.showVideo = function (link) {
                               $scope.player.videoId = link;
                           };
                           
                           
                           $scope.closevideo = function() {

                               $("iframe").each(function() {
                                   var src = $(this).attr('src');
                                   $(this).attr('src', src);
                               });
                           };
                            
                       }]);

}(window, window.angular));