/*global window */
(function (window, angular) {
    'use strict';

    angular
        .module(window.appName)
        .factory('youtubeServiceModel', ['$window', function ($window) {

            var _self = this;

            this.player = {};


            this.loadYoutubePlayer = function(element, scope) {
                var tag = document.createElement('script');
                tag.src = "https://www.youtube.com/iframe_api";
                var firstScriptTag = document.getElementsByTagName('script')[0];
                firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

                /*   var player;*/

                $window.onYouTubeIframeAPIReady = function() {

                    _self.player = new YT.Player(element.children()[0], {
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
                            onStateChange: function(event) {

                                console.log("STATUS CHANGED. New status: " + event.data);

                            }
                        }
                    });
                };

            };
            return {
                self: _self,
            };
        }]);
}(window, window.angular));