cordova.define("cordova/plugin/videoplayer",
  function(require, exports, module) {
    var exec = require("cordova/exec");
    var VideoPlayer = function () {};

    /**
     * Starts the video player intent
     *
     * @param url           The url to play
     */
    VideoPlayer.prototype.play = function(url) {
        exec(null, null, "VideoPlayer", "playVideo", [url]);
    };

    var videoPlayer = new VideoPlayer();
    module.exports = videoPlayer;
});

if (!window.plugins) {
    window.plugins = {};
}
if (!window.plugins.videoPlayer) {
    window.plugins.videoPlayer = cordova.require("cordova/plugin/videoplayer");
}

/*

if (!window['YT'])
{
    var YT = { loading: 0, loaded: 0 };
} if (!window['YTConfig'])
{
    var YTConfig = { 'host': 'http://www.youtube.com' };
  } if (!YT.loading) {
      YT.loading = 1;
      (function ()
      {
          var l = [];
          YT.ready = function(f) {
               if (YT.loaded) { f(); } else { l.push(f); }
          };
          window.onYTReady = function() {
               YT.loaded = 1; for (var i = 0; i < l.length; i++) { try { l[i](); } catch (e) { } }
          };
          YT.setConfig = function(c) {
               for (var k in c) { if (c.hasOwnProperty(k)) { YTConfig[k] = c[k]; } }
          };
          var a = document.createElement('script');
          a.type = 'text/javascript';
          a.id = 'www-widgetapi-script';
          a.src = 'https:' + '//s.ytimg.com/yts/jsbin/www-widgetapi-vflUMcivq/www-widgetapi.js';
          a.async = true; var b = document.getElementsByTagName('script')[0]; b.parentNode.insertBefore(a, b);
      })();
    }*/