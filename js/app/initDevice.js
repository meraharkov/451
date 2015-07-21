document.addEventListener("deviceready", onDeviceReady, false);
window.fileSystemGlobal = null;

function onDeviceReady() {
     
    alert("onDeviceReady");
    $("#loading-id").append("<div class='log-info'>" + "onDeviceReady " +  " </div>");
    
    window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, onRequestFileSystemSuccess, null);
}

function onRequestFileSystemSuccess(fileSystem) {
    alert("onRequestFileSystemSuccess");
    window.fileSystemGlobal = fileSystem;
    $("#loading-id").append("<div class='log-info'>" + "onRequestFileSystemSuccess " + " </div>"); 
}