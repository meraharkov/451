﻿ 
document.addEventListener("deviceready", onDeviceReady, false);
window.fileSystemGlobal = null;

function failresolveLocalFileSystemURL(code) {
    alert("failresolveLocalFileSystemURL code" + code);
}

function onDeviceReady() {

    alert("onDeviceReady");
  //  removeFileVer2("temp2.txt"); doesn*t work

    window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, onRequestFileSystemSuccess, null);

}

function onRequestFileSystemSuccess(fileSystem) {
    alert("onRequestFileSystemSuccess");
    alert(fileSystem.root);
    
    window.fileSystemGlobal = fileSystem;
    
    downloadImage();
    

   // deleteFile("temp.txt"); work is good 
 
   //  deleteFolder("Content"); work is good 
    
   getFolder("Content");
   
 /*  alert("cordova.file.applicationDirectory" + cordova.file.applicationDirectory);
   window.resolveLocalFileSystemURL(cordova.file.applicationDirectory + "versionApp.txt", gotFile, failresolveLocalFileSystemURL);
     
   */
}

function deleteFolderError(error) {
    alert("deleteFolderError " + error.code);
}

function removeRecursivelyError(error) {
    alert("removeRecursivelyError " + error.code);
}

function deleteFolder(folderName) {
    alert("deleteFolder");
    var fileSystem = window.fileSystemGlobal;
    
    alert(folderName);
    fileSystem.root.getDirectory(
                 folderName,
                { create: true, exclusive: false },
                function (entry) {
                    alert("Remove Folder");
                    
                    entry.removeRecursively(function () {
                        alert("Remove Folder Succeeded");
                    }, removeRecursivelyError);
                }, deleteFolderError);
}
 
function gotFile(fileEntry) {
    alert("gotFile");
    fileEntry.file(function (file) {
        var s = "";
        s += "<b>name:</b> " + file.name + "<br/>";
        s += "<b>localURL:</b> " + file.localURL + "<br/>";
        s += "<b>type:</b> " + file.type + "<br/>";
        s += "<b>lastModifiedDate:</b> " + (new Date(file.lastModifiedDate)) + "<br/>";
        s += "<b>size:</b> " + file.size + "<br/>";
        document.querySelector("#status").innerHTML = s;
        
        
        var reader = new FileReader();

        reader.onloadend = function(e) {
           var strFile = "Text is: " + this.result;
            document.querySelector("#textArea").innerHTML = this.result;
        };
        reader.readAsText(file);
        console.dir(file);

    });
}

function getFolder(nameFolder) {
    
    alert("getFolder" + nameFolder);
    
    var fileSystem = window.fileSystemGlobal;
    
    fileSystem.root.getDirectory(nameFolder,
                 { create: true, exclusive: false },
                 function (directory) {
                     alert("into directory: " + directory.name);
                     
                     // Get a directory reader
                     var path = cordova.file.applicationDirectory + directory.name;
                     alert(path);
                     var directoryReader = fileSystem.root.createReader();

                     // Get a list of all the entries in the directory
                     directoryReader.readEntries(readEntriesSuccess, readEntriesFail);

                 },
                 getDirectoryError);
}

function getDirectoryError(code) {
    alert("getDirectoryError code" + code);
}

function readEntriesSuccess(entries) {

    alert("count entities" + entries.length);
    
    if (entries.length == 0) {
        alert("Try to Upload Image ");
        entries.file(uploadPhoto, uploadFileError);
    }

    var i;
    for (i = 0; i < entries.length; i++) {
       
        if (entries[i].isDirectory == true) {
            alert("Directory" + entries[i].name);
            var directoryReaderIn = entries[i].createReader();
            directoryReaderIn.readEntries(readEntriesSuccess, readEntriesFail);
        }
       
        if (entries[i].isFile == true) {
            alert("File name: " + entries[i].name); 
        }
    }
    
}

function readEntriesFail(error) {
    alert("Failed to list directory contents: " + error.code);
}

function uploadPhoto(imageURI) {

    alert("uploadPhoto imageURI = " + imageURI);
    var options = new FileUploadOptions();
    var ft = new FileTransfer();
    ft.upload(imageURI, "http://web421.newlinetechnologies.net/Content/6.12.15/ExMortis/EXMORT_Screencap001.png", win, failuploadPhoto, options);
     
    /*var target = ""; //the url to upload on server
    var ft = new FileTransfer(), path = "file://" + file.fullPath, name = file.name;
    ft.upload(path, target, win, fail, { fileName: name });*/
}

function win(r) {
    alert("Code = " + r.responseCode);
    alert("Response = " + r.response);
    alert("Sent = " + r.bytesSent);
}

function failuploadPhoto(codeError) {
    alert("fail failuploadPhoto" + codeError);
}

function deleteFile(fileName) {
    alert("deleteFile" + fileName);
    alert(window.fileSystemGlobal.root);
    
    window.fileSystemGlobal.root.getFile(fileName, { create: true, exclusive: false }, removeFile, removeFileError);
     
}

function removeFile(fileEntry) {

    alert("removeFile");
    fileEntry.remove(successRemove, failRemove);
}

function successRemove(entry) {
    alert("File Removal succeeded ");
    alert(entry);
}

function failRemove(error) {
    alert('Error removing file: ' + error.code);
}

function removeFileError(error) {
    alert("removeFileError code" + error.code);
}


function removeFileVer2(fileName) {

    alert("removeFileVer2");
    
    var root = getFileSystemRoot();
    
    var remove_file = function (entry) {
        alert("remove_file func");
        entry.remove(function () {
            alert("remove inside");
            navigator.notification.alert(entry.toURI(), null, 'Entry deleted');
        }, removeErrorVer2);
    };

    // retrieve a file and truncate it
    root.getFile(fileName, { create: false }, remove_file, onFileSystemError);
}

function removeErrorVer2(code) {
    alert("removeErrorVer2 code" + code);
}

function onFileSystemError(code) {
    alert("onFileSystemError code" + code);
}


function downloadImage() {
    alert("downloadImage");
/*
    var url = 'http://web421.newlinetechnologies.net/Content/6.12.15/ExMortis/EXMORT_Screencap001.png';
    var filePath = cordova.file.applicationDirectory + "imgs";
    alert("filePath" + filePath);

    var fileTransfer = new FileTransfer();
    var uri = encodeURI(url);

    fileTransfer.download(
        uri,
        filePath,
        function (entry) {
            alert("download complete: " + entry.fullPath);
        },
        function (error) {
            alert("download error source " + error.source);
            alert("download error target " + error.target);
            alert("upload error code" + error.code);
        },
        false,
        null
    );*/
    

    var url = "http://web421.newlinetechnologies.net/Content/6.12.15/ExMortis/EXMORT_Screencap001.png";
    var imagePath = fs.root.fullPath + "/EXMORT_Screencap001.png";
    var fileTransfer = new FileTransfer();
    fileTransfer.download(url, imagePath, function (entry) {
        alert("download complete: " + entry.fullPath); // entry is fileEntry object
    }, function (error) {
        alert("download error source " + error.source);
        alert("download error target " + error.target);
        alert("upload error code" + error.code);
    });
}

