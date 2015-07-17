
document.addEventListener("deviceready", onDeviceReady, false);
window.fileSystemGlobal = null;

function failresolveLocalFileSystemURL(code) {
    alert("failresolveLocalFileSystemURL code" + code);
}

function onDeviceReady() {

    alert("onDeviceReady");
 

    window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, onRequestFileSystemSuccess, null);

}

function onRequestFileSystemSuccess(fileSystem) {
    alert("onRequestFileSystemSuccess");
    alert(fileSystem.root);

    window.fileSystemGlobal = fileSystem;

    DownloadFile(
        "http://web421.newlinetechnologies.net/Content/6.12.15/ExMortis/EXMORT_Screencap001.png",
        "Content",
        "EXMORT_Screencap001.png");

    // downloadImage();


    // deleteFile("temp.txt"); work is good 

    //  deleteFolder("Content"); work is good 

    // getFolder("Content");

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

        reader.onloadend = function (e) {
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



function downloadImage() {
    alert("downloadImage");

    var url = "http://web421.newlinetechnologies.net/Content/6.12.15/ExMortis/EXMORT_Screencap001.png";
    alert("url " + url);
    var uri = encodeURI(url);
    alert(uri);

    var imagePath = fs.root.fullPath + "/Content/EXMORT_Screencap001.png";
    alert(imagePath)
    var fileTransfer = new FileTransfer();

    var options = new FileUploadOptions();
    options.fileKey = "file";
    options.fileName = "EXMORT_Screencap001.png";
    options.mimeType = "image/png";


    fileTransfer.download(uri, imagePath, function (entry) {
        alert("download complete: " + entry.fullPath); // entry is fileEntry object
    }, function (error) {
        alert("download error source " + error.source);
        alert("download error target " + error.target);
        alert("upload error code" + error.code);
    });
}


function DownloadFile(URL, Folder_Name, File_Name) {
    alert("DownloadFile");
    //Parameters mismatch check
    if (URL == null && Folder_Name == null && File_Name == null) {
        alert("URL == null && Folder_Name == null && File_Name == null");
        return;
    }
    else {
        //checking Internet connection availablity
        var networkState = navigator.connection.type;
        if (networkState == Connection.NONE) {
            alert("networkState == Connection.NONE");
            return;
        } else {
            download(URL, Folder_Name, File_Name); //If available download function call
        }
    }
}


function download(URL, Folder_Name, File_Name) {
    alert("download");

    //step to request a file system 
    window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, fileSystemSuccess, fileSystemFail);

    function fileSystemSuccess(fileSystem) {
        alert("fileSystemSuccess");
        window.FS = fileSystem;
        var folderName = "Package/Image";

        var createDirectorySuccess = function (entry) {
            alert("createDirectorySuccess")
            alert("Dir path - " + entry.fullPath);
      
                alert("start download");
                

                var fileTransfer = new FileTransfer();

                var download_link = encodeURI(URL);
                alert("download_link " + download_link);

                var fp = fileSystem.root.toURL() + entry.fullPath + File_Name; //important workin code

               
               // var fp = cordova.file.applicationDirectory +'www/'+ entry.fullPath + File_Name;

                alert("fp " + fp);

                // File download function with URL and local path
                fileTransfer.download(download_link, fp,
                    function(entry) {
                        alert("download complete: " + entry.fullPath);
                       
                        $("#Image-1").attr("src", entry.fullPath);

                        var srcUrl = "/" + entry.fullPath;
                        $("#Image-2").attr("src", srcUrl);


                        var srcUrl3 = fileSystem.root.toURL() +  entry.fullPath;
                        $("#Image-3").attr("src", srcUrl3);


                    },
                    function(error) {
                        //Download abort errors or download failed errors
                        alert("download error source " + error.source);
                        alert("download error target " + error.target);
                        alert("upload error code" + error.code);
                    },
                    false,
                    {}
                );
             
        };
    
        

       createDirectory(folderName, createDirectorySuccess);

                  /*   var fp = cordova.file.applicationDirectory + "www/"; //rootdir.fullPath; // Returns Fulpath of local directory
                     alert("fp " + fp);
                     fp = fp + Folder_Name + "/";// + File_Name;// + "." + ext; // fullpath and name of the file which we want to give
                     alert("fp " + fp);    var fp = fileSystem.root.toURL();*/
               

        // download function call
       // filetransfer(download_link, fp);
    }

    function onDirectorySuccess(parent) {

        alert("onDirectorySuccess");
        // Directory created successfuly
    }

    function onDirectoryFail(error) {
        //Error while creating directory
        alert("Unable to create new directory: " + error.code);
    }

    function fileSystemFail(evt) {
        //Unable to access file system
        alert(evt.target.error.code);
    }
}

function filetransfer(download_link, fp) {
    alert("filetransfer");
    var fileTransfer = new FileTransfer();
    // File download function with URL and local path
    fileTransfer.download(download_link, fp,
                        function (entry) {
                            alert("download complete: " + entry.fullPath);
                        },
                     function (error) {
                         //Download abort errors or download failed errors
                         alert("download error source " + error.source);
                         alert("download error target " + error.target);
                         alert("upload error code" + error.code);
                     },
                      false,
                      null
                );
}


function createDirectory(path, success) {

    alert("createDirectory");
     
    var dirs = pathTemp.split("/").reverse();

    //var dirs = path.split("/").reverse();
    var root = window.FS.root; //cordova.file.applicationDirectory +'www/'
    alert(root);
     
    var createDir = function (dir) {
        alert("create dir " + dir);

        root.getDirectory(dir, {
            create: true,
            exclusive: false
        }, successCB, failCB);
    };

    var successCB = function (entry) {
        alert("dir created " + entry.fullPath);
        root = entry;
        if (dirs.length > 0) {
            createDir(dirs.pop());
        } else {
            alert("all dir created");
            success(entry);
        }
    };

    var failCB = function () {
        alert("failed to create dir " + dir);
    };

    createDir(dirs.pop());
}