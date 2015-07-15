/**
 * @ngdoc module
 * @name youtubePlayer
 * @module youtubePlayer
 * @description
 * Module to display youtube video player
 * @author Sergey Myasnikov <bulkismaslom@gmail.com>
 */
var youtubePlayerModule = angular.module('youtubePlayer', []);
/* global YT, youtubePlayerModule */
/**
 * @ngdoc object
 * @name youtubePlayer.youtubeVideo
 * @requires  $scope, youtubeApi
 * @description
 * Controller for youtubeVideo directive
 */
youtubePlayerModule.controller('youtubeVideo', ['$scope','youtubeApi', function($scope, youtubeApi) {

    this.player = null;
    this.element = null;
    var playerReady = false;
    var self = this;

    /**
     * @ngdoc method
     * @name youtubePlayer.youtubeVideo#init
     * @description
     * Initiate controller of the current player.
     * This will load youtube api and initiate player with given parameters
     *
     * @see youtubeApi.youTubeIframeAPIReady
     * @see cueVideo
     */
    this.init = function(){
        youtubeApi.youTubeIframeAPIReady().then(
            function(){
                if(self.valid()) {
                    self.cueVideo();
                }
            },
            function(){
                $scope.onApiLoadingFailure({controller:self});
            }
        );
    };

    /**
     * @ngdoc method
     * @name youtubePlayer.youtubeVideo#reload
     * @description
     * Try to re-initiate controller of the current player.
     * This can be useful when youtube api could not be loaded (e.g. connection lost)
     * @example
     * Example of how it can be used to catch failure of youtube api loading and attempt to load it again
     * ```html
     *   <div youtube-video video-id="{{player1.videoId}}" on-api-loading-failure="onApiLoadingFailure(controller)"></div>
     * ```
     * ```js
     *   $scope.onApiLoadingFailure = function(controller){
     *      controller.reload(); // try load youtube api again
     *   };
     * ```
     *
     * @see init
     */
    this.reload = function(){
        this.init();
    };

    /**
     * @ngdoc method
     * @name youtubePlayer.youtubeVideo#setPlayerElement
     * @description
     * Set html element that will be used for youtube player
     *
     * @param {Object} element - html element that will be used for youtube player
     */
    this.setPlayerElement = function(element){
        this.element = element;
    };

    /**
     * @ngdoc method
     * @name youtubePlayer.youtubeVideo#getPlayer
     * @description
     * Proper way of getting player.
     * This method will initialize youtube player if it is not set yet
     *
     * @returns {Object}
     */
    this.getPlayer = function(){
        if(!this.player){
            this.player = new YT.Player(this.element, {
                playerVars: $scope.playerVars || {},
                height: $scope.height || '390',
                width: $scope.width || '640',
                events: getPlayerEvents()
            });
        }
        return this.player;
    };

    /**
     * @ngdoc method
     * @name youtubePlayer.youtubeVideo#cueVideo
     * @description
     * Loads the specified video's thumbnail and prepares the player to play the video.
     * If videoId is provided then mediaContentUrl has no effect.
     */
    this.cueVideo = function(){
        var player = this.getPlayer();
        if(!playerReady){
            //see getPlayerEvents().onReady for the first player instantiation
            return;
        }

        var context = $scope.videoId ? 'id' : 'url';
        var videoParameters = $scope.videoParameters || {};
        switch(context){
            case 'id':
                videoParameters.videoId = $scope.videoId;
                player.cueVideoById(videoParameters);
                break;
            case 'url':
                videoParameters.mediaContentUrl = $scope.mediaContentUrl;
                player.cueVideoByUrl(videoParameters);
                break;
        }
    };

    /**
     * @ngdoc method
     * @name youtubePlayer.youtubeVideo#valid
     * @description
     * Validate video $scope
     *
     * @returns {boolean}
     */
    this.valid = function(){
        return this.element && ($scope.videoId || ($scope.mediaContentUrl && $scope.mediaContentUrl.match(/^http(s)?:\/\/(www.)?youtube/)));
    };

    /**
     * @ngdoc method
     * @name youtubePlayer.youtubeVideo#getPlayerEvents
     * @description
     * Get list of callbacks for player events according to youtube player api
     *
     * @returns {Object}
     */
    var getPlayerEvents = function(){
        return {
            'onReady': function(event){
                $scope.onReady({event:event});
                playerReady = true;
                self.cueVideo();
            },
            'onStateChange': function(event) {
                $scope.onStateChange({event:event});
            },
            'onPlaybackQualityChange': function(event) {
                $scope.onPlaybackQualityChange({event:event});
            },
            'onPlaybackRateChange': function(event) {
                $scope.onPlaybackRateChange({event:event});
            },
            'onError': function(event) {
                $scope.onError({event:event});
            },
            'onApiChange': function(event) {
                $scope.onApiChange({event:event});
            }
        };
    };

}]);
/* global youtubePlayerModule */
/**
 * @ngdoc directive
 * @name youtubeVideo
 * @restrict AE
 *
 * @description
 * HTML element with youtube player.
 *
 * @example
 * ```html
 * <div youtube-video video-id="{{videoId}}" media-content-url="{{mediaContentUrl}}"
 *     width="{{width}}" height="{{height}}"
 *     video-parameters="videoParameters"
 *     player-vars="playerVars"
 *     on-ready="onReady(event)"
 *     on-state-change="onStateChange(event)"
 *     on-playback-quality-change="onPlaybackQualityChange(event)"
 *     on-playback-rate-change="onPlaybackRateChange(event)"
 *     on-error="onError(event)"
 *     on-api-change="onApiChange(event)"
 *     on-controller-ready="onControllerReady(controller)"
 *     on-api-loading-failure="onApiLoadingFailure(controller)"></div>
 * ```
 *
 * @param {number} height of player. The default value is 640. Watched
 * @param {number} width of player. The default value is 390. Watched
 * @param {string} videoId, optional if mediaContentUrl is provided. Watched
 * @param {string} mediaContentUrl fully qualified YouTube player URL in the format http://www.youtube.com/v/VIDEO_ID?version=3 . Watched
 * @param {expression} playerVars identify player parameters that can be used to customize the player, e.g. {'autoplay':1, 'controls':0}. Not watched
 * @param {expression} videoParameters according to the youtube api, {startSeconds:Number, endSeconds:Number, suggestedQuality:String(small, medium, large, hd720, hd1080, highres or default)}. Watched
 * @param {expression} onReady bind to external function. See youtube api -> onReady event
 * @param {expression} onStateChange bind to external function. See youtube api -> onStateChange event
 * @param {expression} onPlaybackQualityChange bind to external function. See youtube api -> onPlaybackQualityChange event
 * @param {expression} onPlaybackRateChange bind to external function. See youtube api -> onPlaybackRateChange event
 * @param {expression} onError bind to external function. See youtube api -> onError event
 * @param {expression} onApiChange bind to external function. See youtube api -> onApiChange event
 * @param {expression} onControllerReady bind to external function. The callback instantiated when controller of this directive gets available.
 * @param {expression} onApiLoadingFailure bind to external function. Triggered when youtube api could not be loaded (e.g. connection lost)
 *
 */
youtubePlayerModule.directive('youtubeVideo', function() {
    return {
        restrict: 'AE',
        scope: {
            height: '@',
            width: '@',
            videoId: '@',
            mediaContentUrl: '@',
            playerVars: '=?',
            videoParameters: '=?',
            onReady: '&?',
            onStateChange: '&?',
            onPlaybackQualityChange: '&?',
            onPlaybackRateChange: '&?',
            onError: '&?',
            onApiChange: '&?',
            onControllerReady: '&?',
            onApiLoadingFailure: '&?'
        },
        template: '<div></div>',
        controller: 'youtubeVideo',
        link: function($scope, element, attrs, ctrl) {
            $scope.onControllerReady({controller:ctrl});
            ctrl.setPlayerElement(element.children()[0]);
            ctrl.init();

            $scope.$watch('height + width', function(newValue, oldValue) {
                if (newValue===oldValue || !ctrl.valid()) {return;}
                ctrl.getPlayer().setSize($scope.width, $scope.height);
            });
            $scope.$watch('[videoId,mediaContentUrl]', function(newValue, oldValue) {
                //if there is videoId and it is not changed then change of the mediaContentUrl should be ignored
                if ((newValue[0] && oldValue[0]===newValue[0]) || angular.equals(oldValue,newValue) || !ctrl.valid()) {return;}
                ctrl.cueVideo();
            });
            $scope.$watch('videoParameters', function(newValue, oldValue) {
                if (angular.equals(oldValue,newValue) || !ctrl.valid()) {return;}
                ctrl.cueVideo();
            }, true); //true for objectEquality
        }
    };
});

/* global youtubePlayerModule */
/**
 * @ngdoc service
 * @name youtubeApi
 * @description
 * Asynchronous loading of youtube iframe API
 * @see https://developers.google.com/youtube/iframe_api_reference
 */
youtubePlayerModule.service('youtubeApi', ['$window','$q','$timeout', function($window, $q, $timeout) {
    /**
     * Contains promise of loading youtube iframe API.
     * Used to request loading the API only once
     * @type {Object} $q.defer()
     */
    var iframeAPILoadingDeferred = null;

    /**
     * @ngdoc method
     * @name youtubeApi#youTubeIframeAPIReady
     * @description
     * Asynchronous loading of youtube iframe API
     *
     * @param {Number} timeout time to wait for youtube api to be loaded before rejecting the promise. Default is 15 seconds
     * @returns {Promise} resolved when youtube iframe api loaded
     */
    this.youTubeIframeAPIReady = function(timeout){
        if(!iframeAPILoadingDeferred){
            iframeAPILoadingDeferred = $q.defer();

            var tag = document.createElement('script');
            tag.src = 'https://www.youtube.com/iframe_api';
            var firstScriptTag = document.getElementsByTagName('script')[0];
            firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

            var resolved = false;
            $window.onYouTubeIframeAPIReady = function() {
                resolved = true;
                iframeAPILoadingDeferred.resolve();
            };
            $timeout(function(){
                if(!resolved){
                    iframeAPILoadingDeferred.reject('Could not load youtube iframe API');
                    iframeAPILoadingDeferred = null;
                    tag.parentNode.removeChild(tag);
                }
            }, timeout || 15000);
        }
        return iframeAPILoadingDeferred.promise;
    };

}]);