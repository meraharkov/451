/*global window*/
(function (window, angular, $) {
    'use strict';

    angular
        .module(window.appName)
        .directive('youtube', ['$window', 'youtubeServiceModel', function ($window, youtubeServiceModel) {
         
            var isInitialized = false;
            var player, tag, firstScriptTag;
            
            return {
                restrict: "E",

                scope: {
                    height: "@",
                    width: "@",
                    videoid: "@",
                },

                template: '<div></div>',

                link: function (scope, element) {

                   /* if (!isInitialized) { }*/
                        tag = document.createElement('script');
                        tag.src = "https://www.youtube.com/iframe_api";
                        firstScriptTag = document.getElementsByTagName('script')[0];
                        firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
                        isInitialized = true;
                   
                   

                 

                    $window.onYouTubeIframeAPIReady = function() {

                        player = new YT.Player(element.children()[0], {
                            playerVars: {
                                autoplay: 0,
                                html5: 1,
                                theme: "light",
                                modesbranding: 0,
                                color: "white",
                                iv_load_policy: 3,
                                showinfo: 1,
                                controls: 1
                            },

                            height: scope.height,
                            width: scope.width,
                            videoId: scope.videoid,
                            events: {
                                'onStateChange': function(event) {

                                    var message = {
                                        event: "",
                                        data: ""
                                    };

                                    switch (event.data) {
                                    case YT.PlayerState.PLAYING:
                                        message.data = "PLAYING";
                                        break;
                                    case YT.PlayerState.ENDED:
                                        message.data = "ENDED";
                                        break;
                                    case YT.PlayerState.UNSTARTED:
                                        message.data = "NOT PLAYING";
                                        break;
                                    case YT.PlayerState.PAUSED:
                                        message.data = "PAUSED";
                                        break;
                                    case YT.PlayerState.CUED:
                                        message.data = "CUED";
                                        break;
                                    };

                                    scope.$emit(message.event, message.data);
                                }
                            }
                        });
                    };
                    

                    scope.$watch('videoid', function (newValue, oldValue) {
                        if (newValue == oldValue) {
                            return;
                        }

                        player.cueVideoById(scope.videoid);

                    });

                    scope.$watch('height + width', function (newValue, oldValue) {
                        if (newValue == oldValue) {
                            return;
                        }

                         player.setSize(scope.width, scope.height);

                    });
                }
            };
            
        }]);
}(window, window.angular, window.jQuery));