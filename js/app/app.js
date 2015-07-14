/*global window*/
(function (window, angular) {
    'use strict';

    window.appName = window.appName || 'comix';
  window.serviceLink = "http://web421.newlinetechnologies.net/";
 // window.serviceLink =  "http://localhost:50038/";

    angular
        .module(window.appName, ['ngRoute', 'ngAnimate', 'youtubePlayer'])  /*'youtubePlayer'*/
        .config(['$routeProvider', '$locationProvider',  
            function ($routeProvider, $locationProvider ) {

                $routeProvider
                .when('/', { templateUrl: 'js/partials/home.html' })
                .when('/title', { templateUrl: 'js/partials/title.html'})
                .when('/about', { templateUrl: 'js/partials/about.html' })
                .otherwise({ redirectTo: '/' });
            
               $locationProvider.html5Mode(false); 

            }]);

}(window, window.angular));


$(document).ready(function () {
     
    $('.main-menu-btn').click(function () {
        $('#menuModal')
            .prop('class', 'modal fade') // revert to default
            .addClass($(this).data('direction'));
        $('#menuModal').modal('show');
    });

    $('#bad-moon-menu-btn').click(function () {
        $('#menuModal').modal('hide');
    });

    $("#facebook").click(function () {
        var ref = window.open('https://www.facebook.com/SourceSeek', '_system', 'location=no');       // loads in the system browser  
    });

    $("#instagramm").click(function () {
        var ref = window.open('https://instagram.com/', '_system', 'location=no');       
    });

    $("#twitter").click(function () {
        var ref = window.open('https://twitter.com/sourceseek', '_system', 'location=no');    
    });

    $("#tumbrl").click(function () {
        var ref = window.open('https://www.tumblr.com/', '_system', 'location=no');      
    });

    
    function preventDefault(e) {
        e.preventDefault();
    };
    
    $('#menuModal').on('shown.bs.modal', function (e) {
  
        document.addEventListener('touchmove', preventDefault, false);

        $(document.body).addClass("remove-scroll");
  
    });

    $('#menuModal').on('hidden.bs.modal', function (e) {
    
        document.removeEventListener('touchmove', preventDefault, false);

        $(document.body).removeClass("remove-scroll"); 
    });
    
    //Global instance of DirectoryEntry for our data
   /* var DATADIR;
    var knownfiles = [];

    //Loaded my file system, now let's get a directory entry for where I'll store my crap
    function onFSSuccess(fileSystem) {
        fileSystem.root.getDirectory("Android/data/com.camden.imagedownloaddemo", { create: true }, gotDir, onError);
    }

    //The directory entry callback
    function gotDir(d) {
        alert("got dir");
        DATADIR = d;
        var reader = DATADIR.createReader();
        reader.readEntries(function (d) {
            gotFiles(d);
            appReady();
        }, onError);
    }

    //Result of reading my directory
    function gotFiles(entries) {
        alert("The dir has " + entries.length + " entries.");
        for (var i = 0; i < entries.length; i++) {
            console.log(entries[i].name + ' dir? ' + entries[i].isDirectory);
            knownfiles.push(entries[i].name);
            renderPicture(entries[i].fullPath);
        }
    }

    function renderPicture(path) {
        $("#photos").append("<img src='file://" + path + "'>");
        alert("<img src='file://" + path + "'>");
    }

    function onError(e) {
        alert("ERROR");
        alert(JSON.stringify(e));
    }

    function onDeviceReady() {
        //what do we have in cache already?
        $("#status").html("Checking your local cache....");
        window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, onFSSuccess, null);
    }

    function appReady() {
        $("#status").html("Ready to check remote files...");
        $.get("http://www.raymondcamden.com/demos/2012/jan/17/imagelister.cfc?method=listimages", {}, function (res) {
            if (res.length > 0) {
                $("#status").html("Going to sync some images...");
                for (var i = 0; i < res.length; i++) {
                    if (knownfiles.indexOf(res[i]) == -1) {
                        console.log("need to download " + res[i]);
                        var ft = new FileTransfer();
                        var dlPath = DATADIR.fullPath + "/" + res[i];
                        console.log("downloading crap to " + dlPath);
                        ft.download("http://www.raymondcamden.com/demos/2012/jan/17/" + escape(res[i]), dlPath, function () {
                            renderPicture(dlPath);
                            console.log("Successful download");
                        }, onError);
                    }
                }
            }
            $("#status").html("");
        }, "json");

    }*/

   
    
    
});

/*document.addEventListener("deviceready", onDeviceReady, true);*/

document.addEventListener("deviceready", function () {
    alert("123");
}, true);

// device APIs are available
function onDeviceReady() {

    alert("onDeviceReady");
    window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, gotFS, fail);
}

function gotFS(fileSystem) {

    alert(fileSystem.name);
    alert(fileSystem.root.name);


    fileSystem.root.getFile("readme.txt", null, gotFileEntry, fail);
}

function gotFileEntry(fileEntry) {
    fileEntry.file(gotFile, fail);
}

function gotFile(file) {
    readDataUrl(file);
    readAsText(file);
}

function readDataUrl(file) {
    var reader = new FileReader();
    reader.onloadend = function (evt) {
        alert("Read as data URL");
        alert(evt.target.result);
    };
    reader.readAsDataURL(file);
}

function readAsText(file) {
    var reader = new FileReader();
    reader.onloadend = function (evt) {
        alert("Read as text");
        alert(evt.target.result);
    };
    reader.readAsText(file);
}

function fail(error) {
    alert(error.code);
}