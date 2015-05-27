"use strict";
function StreamingMedia() {
}

StreamingMedia.prototype.playAudio = function (url, options) {
	options = options || {};
	cordova.exec(options.successCallback || null, options.errorCallback || null, "StreamingMedia", "playAudio", [url, options]);
};
StreamingMedia.prototype.playVideo = function (url, options) {
	options = options || {};
	cordova.exec(options.successCallback || null, options.errorCallback || null, "StreamingMedia", "playVideo", [url, options]);
};


StreamingMedia.install = function () {
	if (!window.plugins) {
		window.plugins = {};
	}
	window.plugins.streamingMedia = new StreamingMedia();
	return window.plugins.streamingMedia;
};


document.body.innerHTML += '<div id="#debugDiv" style="position: absolute; width: 100%; height: 100px; background: white; overflow: auto; "> </div>';


console.log = function (message) {
     
    var div = document.getElementById('#debugDiv');

    div.innerHTML  += message;
    div.innerHTML += "<br/>  ================================> <br/>";
    /*  $('#debugDiv').append('<p>' + message + '</p>');*/
};

try {
    cordova.addConstructor(StreamingMedia.install);
    console.log("cordova object");
    console.log(cordova);
    
    console.log("cordova.addConstructor object");
    console.log(cordova.addConstructor);
    

    console.log("StreamingMedia.install object");
    console.log(StreamingMedia.install);
    
} catch(e) {
    alert(e);
}

