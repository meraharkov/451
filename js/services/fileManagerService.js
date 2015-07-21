(function (window, angular) {
    'use strict';

    angular
        .module(window.appName)
        .factory('fileManagerService', ['packageRepository',
                            function (packageRepository) {

                                var _self = this;


                                this.downloadImageByLink = function (imagePathOnserver) {

                                    var downloadLink = window.serviceLink + imagePathOnserver;
                                    
                                    $("#loading-id").append("<div class='log-info'>"+ "url to download "+ downloadLink  + " </div>");

                                    var fileTransfer = new FileTransfer();
                                    var filePath = window.fileSystemGlobal.root.toNativeURL() + imagePathOnserver;
                                    $("#loading-id").append("<div class='log-info'>" + "device storage " + filePath + " </div>");
                                    $("#loading-id").append("<div class='log-info'>" + "/" + " </div>");
                                    
                                    fileTransfer.download(downloadLink, filePath, function (entry) {
                                        $("#loading-id").append("<div class='log-info'>" + "/" + " </div>");
                                        $("#loading-id").append("<div class='log-info'>" + "download complete image path: " + entry.fullPath + " </div>");
                                         
                                            return entry.fullPath;
                                        },
                                               function (error) {
                                                   //Download abort errors or download failed errors
                                                   $("#loading-id").append("<div class='log-info'>" + "/" +  " </div>");
                                                   $("#loading-id").append("<div class='log-info'>" + "download error source: " + error.source + " </div>");
                                                   $("#loading-id").append("<div class='log-info'>" + "download error source: " + error.target + " </div>");
                                                   $("#loading-id").append("<div class='log-info'>" + "download error source: " + error.code + " </div>"); 
                                                   return null;
                                               },
                                               false,
                                               {}
                                    );
                                    
                                };

                               /* var checkFile = function( pathFroServer) {
                                  
                                    var pathToFile = window.fileSystemGlobal.root.toNativeURL() + pathFroServer;
                                    alert(pathToFile);
                                    window.resolveLocalFileSystemURL(pathToFile, gotFile(fileEntry, function(response) {
                                        return response;
                                    }), checkFileFail);
                                };
                                
                                function checkFileFail(e , response) {
                                    alert("Check file  Error" + e.code);

                                }

                                function gotFile(fileEntry, response) {

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
                                }*/

                                this.downloadImage = function (packageFromServer) {
                                     
                                    alert("start download");
                                   
                                    var pathToVault = window.fileSystemGlobal.root.toNativeURL();
                                    alert(pathToVault);
                                  
                                    for (var i = 0; i < packageFromServer.Pages.length; i++)
                                    {

                                        for (var j = 0; j < packageFromServer.Pages[i].ContentPage.length; j++)
                                        { 
                                            var downloadLink = window.serviceLink  + packageFromServer.Pages[i].ContentPage[j].LinkToImage;
                                            var filePath = pathToVault + packageFromServer.Pages[i].ContentPage[j].LinkToImage;

                                            var pathToImage = downloadImageByLink(downloadLink, filePath);

                                            alert(pathToImage);

                                            packageFromServer.Pages[i].ContentPage[j].pathToImage = pathToImage; 
                                        }
                                    }
                                };

                                

                                return {
                                    self: _self,
                                };
                            }]);
}(window, window.angular));