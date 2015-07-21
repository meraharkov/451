
alert("init device js");
/*document.addEventListener("deviceready", onDeviceReady, false);*/
window.fileSystemGlobal = null;

document.addEventListener('deviceready', function onDeviceReady() {
    alert("onDeviceReady 2");
    $("#loading-id").append("<div class='log-info'>" + "onDeviceReady " + " </div>");

    window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, onRequestFileSystemSuccess, null);
}, false);

/*
function onDeviceReady() {
     
    alert("onDeviceReady");
    $("#loading-id").append("<div class='log-info'>" + "onDeviceReady " +  " </div>");
    
    window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, onRequestFileSystemSuccess, null);
}*/

function onRequestFileSystemSuccess(fileSystem) {
    alert("onRequestFileSystemSuccess");
    window.fileSystemGlobal = fileSystem;

    alert("root : " + window.fileSystemGlobal.root.toNativeURL());
    
    $("#loading-id").append("<div class='log-info'>" + "onRequestFileSystemSuccess " + " </div>"); 
}