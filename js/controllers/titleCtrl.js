/*global window */
(function (window, angular) {
    'use strict';

    angular
        .module(window.appName)
        .controller('titleCtrl', ['$scope', function ($scope) {

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
            
            /*$scope.isShowVideo = false;
            $scope.isShowPopap = true;
            
            $scope.startVideo = function () {
                
                var videoUrl = "https://www.youtube.com/embed/T0bVqgBSZHk";

                console.log("videoUrl object");
                console.log(videoUrl);

                // Just play a video
                // window.plugins.streamingMedia.playVideo(videoUrl);

                // Play a video with callbacks
                var options = {
                    successCallback: function () {
                        alert("success Callback");
                        console.log("Video was closed without error.");
                    },
                    errorCallback: function (errMsg) {
                        console.log("Error! " + errMsg);
                        alert(errMsg);
                    }
                };

                try {
                    console.log("window.plugins object");
                    console.log(window.plugins);

                    console.log("window.plugins.streamingMedia");
                    console.log(window.plugins.streamingMedia);

                    console.log("window.plugins.streamingMedia.playVideo");
                    console.log(window.plugins.streamingMedia.playVideo);

                    window.plugins.streamingMedia.playVideo(videoUrl, options);
                } catch (e) {
                    alert(e);
                }
*/
            /*var width = 800;
                var heght = 600;
                
                $('#video').css({ width: width + 'px', height: heght + 'px' });
                
                $(window).resize(function () {
                    $('#video').css({ width: width + 'px', height: heght + 'px' });
                });*/


            /*$('#video').css({ width: $(window).innerWidth() + 'px', height: $(window).innerHeight() + 'px' }); 

                // If you want to keep full screen on window resize
                 $(window).resize(function () {
                    $('#video').css({ width: $(window).innerWidth() + 'px', height: $(window).innerHeight() + 'px' });
                }); 
            };*/
        } ]);

}(window, window.angular));