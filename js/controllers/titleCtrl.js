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
                               $scope.player1.videoId = link;
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
                           

                           $scope.onReady = function (event) {
                               console.log('onReady');
                               console.log(event);
                               // var player = event.target;
                               // player.playVideo();
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

                           $scope.player1 = {
                               width: '640',
                               height: '390',
                               videoId: 'i9MHigUZKEM',
                               videoParameters: {}
                           };
                            

                       }]);

}(window, window.angular));