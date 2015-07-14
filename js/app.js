//document.addEventListener("deviceready", init, false);
function init() {
   alert("init")
    //This alias is a read-only pointer to the app itself
    window.resolveLocalFileSystemURL(cordova.file.applicationDirectory + "www/index.html", gotFile, fail);


    window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, onRequestFileSystemSuccess, null);
    alert("cordova.file.applicationDirectory" + cordova.file.applicationDirectory);
}

function fail(e) {
    alert("FileSystem Error")
    console.log("FileSystem Error");
    console.dir(e);
}

function gotFile(fileEntry) {

    fileEntry.file(function (file) {
        var s = "";
        s += "<b>name:</b> " + file.name + "<br/>";
        s += "<b>localURL:</b> " + file.localURL + "<br/>";
        s += "<b>type:</b> " + file.type + "<br/>";
        s += "<b>lastModifiedDate:</b> " + (new Date(file.lastModifiedDate)) + "<br/>";
        s += "<b>size:</b> " + file.size + "<br/>";

        document.querySelector("#status").innerHTML = s;
        console.dir(file);
        
    });
}


function onRequestFileSystemSuccess(fileSystem) {
     
    alert(fileSystem.root)
    var entry = fileSystem.root;
    entry.getDirectory("example", { create: true, exclusive: false }, onGetDirectorySuccess, onGetDirectoryFail);
}

function onGetDirectorySuccess(dir) {
    console.log("Created dir " + dir.name);
    alert("Created dir " + dir.name);
}

function onGetDirectoryFail(error) {
    alert("Error creating directory " + error.code);
    console.log("Error creating directory " + error.code);
}
/*=====================*/
document.addEventListener("deviceready", showFileSystem, false);

function successReadEntries() {
    alert("successReadEntries")
    var s = "";
    var i;
    for (i = 0; i < entries.length; i++) {
        s += "<div onclick='callDerictory(" + entries[i].name +  ")'>  " + entries[i].name + " </div> <br/>";
    }

    document.querySelector("#status").innerHTML = s;
}

function callDerictory(directory) {
    alert(directory);
}

function failRreadEntries() {
    alert("Failed to list directory contents: " + error.code);
}

function showFileSystem() {

    alert("showFileSystem");
    var path = cordova.file.applicationDirectory;

    alert(path);

    var dirEntry = new DirectoryEntry('', path);

    alert('is it? ' + dirEntry.isDirectory);

    var directoryReader = dirEntry.createReader();

    directoryReader.readEntries(successReadEntries, failRreadEntries);
}

function createFolder(passToFolder, nameFolder) {
    var entry = fileSystem.root;
    var derictory = passToFolder + nameFolder;
    alert(derictory)
    entry.getDirectory(derictory, { create: true, exclusive: false }, onGetDirectorySuccess, onGetDirectoryFail);
}
