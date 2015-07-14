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
                           

                           $scope.onReady = function (event) {
                               console.log('onReady');
                               console.log(event);
                               event.target.playVideo();
                           };
                           $scope.onStateChange = function (event) {
                               console.log('onStateChange');
                               console.log(event);
                           };
                           $scope.onPlaybackQualityChange = function (event) {
                               console.log('onPlaybackQualityChange');
                               console.log(event);
                           };
                           $scope.onPlaybackRateChange = function (event) {
                               console.log('onPlaybackRateChange');
                               console.log(event);
                           };
                           $scope.onError = function (event) {
                               console.log('onError');
                               console.log(event);
                           };
                           $scope.onApiChange = function (event) {
                               console.log('onApiChange');
                               console.log(event);
                           };
                           $scope.onControllerReady = function (controller) {
                               console.log('onControllerReady');
                               console.log(controller);
                               // can manipulate controller
                           };
                           $scope.onApiLoadingFailure = function (controller) {
                               console.log('onApiLoadingFailure');
                               console.log(controller);
                               // controller.reload(); // try load youtube api again
                           };
 
                          
                            

                       }]);

}(window, window.angular));