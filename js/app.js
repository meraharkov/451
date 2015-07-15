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


function successReadEntries(entries) {
    alert("successReadEntries")
    var s = "";
    var i;

    var fileSystem = LocalFileSystem.PERSISTENT;
     
    for (i = 0; i < entries.length; i++) {
        s += "<div onclick='callDerictory(" + entries[i].name +  ")'>  " + entries[i].name + " </div> <br/>";
    }


    for (i = 0; i < entries.length; i++) {

        var dataDir = fileSystem.root.getDirectory(entries[i].name, { create: false }, onGetDirectorySuccess, onGetDirectoryFail);
        alert(dataDir.toString());

        
    }

   
    document.querySelector("#status").innerHTML = s;
}

function callDerictory(directory) {
    alert(directory);
}

function failRreadEntries()
{
    alert("Failed to list directory contents: " + error.code);
}


function successMetadata(metadata) {
    alert("Last Modified: " + metadata.modificationTime);
}

function failMetadata(error) {
    alert(error.code);
}

 
 

function showFileSystem() {

    alert("showFileSystem");
    
    var directoryReader = fileSystem.root.createReader();


    // Get a list of all the entries in the directory
    //directoryReader.readEntries(successReadEntries, failRreadEntries);
    directoryReader.readEntries(function (entries) {
        alert(" readEntries TRUE");
        for (i = 0; i < entries.length; i++) {
            s += "<div onclick='callDerictory(" + entries[i].name + ")'>  " + entries[i].name + " </div> <br/>";
        }

    }
        , function () {
            alert(" readEntries FALSE  ")
        });



    var path = cordova.file.applicationDirectory;

    alert(path);

    var dirEntry = new DirectoryEntry('', path);

    alert('is it? ' + dirEntry.isDirectory);

    alert("dirEntry name " + dirEntry.name)

    alert("dirEntry fullPath " + dirEntry.fullPath)

 

    window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, onRequestFileSystemSuccess, null);

   
   

    //var directoryReader = dirEntry.createReader();      
   
    //alert("after directoryReader.readEntries")  
  //  window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, onRequestFileSystemSuccess, null);
}


  // document.addEventListener("deviceready", showFileSystem, false);


//function createFolder(passToFolder, nameFolder) {
//    var entry = fileSystem.root;
//    var derictory = passToFolder + nameFolder;
//    alert(derictory)
//    entry.getDirectory(derictory, { create: true, exclusive: false }, onGetDirectorySuccess, onGetDirectoryFail);
//}



   document.addEventListener("deviceready", onDeviceReady, false);
   function onDeviceReady() {

       alert(" window.requestFileSystem")
       window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, gotFS, fail);
   }
  

   function gotFS(fileSystem) {

       alert("gotFS")
       var reader = fileSystem.root.createReader();
       reader.readEntries(gotList, fail);
   }

   function gotList(entries) {
       //var i;
       //for (i = 0; i < entries.length; i++) {
       //    if (entries[i].name.indexOf(".svg") != -1) {
       //        uploadPhoto(entries[i].fullPath);
       //    }
       //}

       alert("gotList")
       var s = "";
       var i;

       var fileSystem = LocalFileSystem.PERSISTENT;

       for (i = 0; i < entries.length; i++) {
           s += "<div>" + entries[i].name + "</div> <br/>";
       }


       //for (i = 0; i < entries.length; i++) {

       //    var dataDir = fileSystem.root.getDirectory(entries[i].name, { create: false }, onGetDirectorySuccess, onGetDirectoryFail);
       //    alert(dataDir.toString());


       //}


       document.querySelector("#status").innerHTML = s;

   }

 
   function uploadPhoto(imageURI) {
       var options = new FileUploadOptions();
       var ft = new FileTransfer();
       ft.upload(imageURI, "http://192.168.1.54:8080/POC/fileUploader", win, fail, options);
   }