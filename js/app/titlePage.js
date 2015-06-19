

// 3. This function creates an <iframe> (and YouTube player)
//    after the API code downloads.
var player;
function onYouTubeIframeAPIReady()
{
    var widthPlayer = window.innerWidth;
    var heightPlayer = window.innerHeight;
    player = new YT.Player('player', {
        height: heightPlayer,
        width: widthPlayer,
        videoId:'T0bVqgBSZHk',// 'M7lc1UVf-VE',
        playerVars: {
            'autoplay': 1,
            'color': 'white',
            'fs': 0, //hide full screen button
            'modestbranding': 1, //hide YouTube logo
            'enablejsapi': 1,//turn on APi Javascript
            'showinfo': 0,//hide title link about video on top iframe
            'controls': 0,
            'playsinline': 0,//show video in full screen page
            'rel': 0 // don*t show other video after this video
        },
        events: {
            'onReady': onPlayerReady
        }
    });
}

function loadIframeYoutubePlayer()
{
   
    var tag = document.createElement('script');

    tag.src = "https://www.youtube.com/iframe_api";
    var firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
}

// 4. The API will call this function when the video player is ready.
function onPlayerReady(event) {
    event.target.playVideo();
    player.setVolume(100);
};

function closevideo() {
  
    $("iframe").each(function () {
        var src = $(this).attr('src');
        $(this).attr('src', src);
    });
}


$('#videoModel').on('hidden.bs.modal', function () {
    closevideo();

    screen.unlockOrientation();
});

$("#videoTrailer").click(function () {
    loadIframeYoutubePlayer();
    screen.lockOrientation('landscape');
});

$("#share-facebook").click(function () {

    window
        .plugins
        .socialsharing
        .shareViaFacebook('Company 451',
            null /* img */,
            "https://www.facebook.com/SourceSeek",  /*  null url */
            function () {
                alert('Your post shared');
            }, function (errormsg) {

            });
});


$("#share-twitter").click(function () {
    window
        .plugins
        .socialsharing
        .shareVia('com.apple.social.twitter',
            'Company 451 Twitter',
            null,
            null,
            'https://twitter.com/sourceseek',
            function () {
                alert('Your post shared');
            },
            function (msg) {
                console.log('error: ' + msg);
            });
});


$("#tumbrl-share").click(function () {
    /*  window
          .plugins
          .socialsharing
          .share('Company 451 tumbrl', null, null, 'https://www.tumblr.com/');*/

    var ref = window.open('http://tumblr.com/widgets/share/tool?canonicalUrl=https://www.facebook.com/SourceSeek', '_system', 'location=no');
});

$("#mail-share").click(function () {

    cordova.plugins.email.open({
        to: '',/* 'recipient@email.com',*/
        cc: '', /* 'your@email.com',*/
        bcc: ['', ''],
        subject: '451 company',
        body: '451 company'
    });
});