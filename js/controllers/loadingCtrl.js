/*global window */
(function (window, angular) {
    'use strict';

    angular
        .module(window.appName)
        .controller('loadingCtrl', ['$scope', 'fileManagerService', 'homeServiceModel', '$location',
                        function ($scope, fileManagerService, homeServiceModel, $location) {

                            $scope.Package = null;
                            $scope.LoginfoArr = [];

                        
                             

                            var showUrlsToDownload = function (packageFromServer) {
                                $scope.LoginfoArr.push("Urls to download");
                                $scope.LoginfoArr.push("/ ");
                                for (var i = 0; i < packageFromServer.Pages.length; i++) {

                                    $scope.LoginfoArr.push("LinkToLogo page  :" + window.serviceLink  + packageFromServer.Pages[i].LinkToLogo);

                                    for (var j = 0; j < packageFromServer.Pages[i].ContentPage.length; j++)
                                    {
                                        $scope.LoginfoArr.push("Link To Image :" + window.serviceLink + packageFromServer.Pages[i].ContentPage[j].LinkToImage);
                                    }
                                    $scope.LoginfoArr.push("/ ");
                                }
                            };

                            $scope.goToHomePage = function () {
                                $location.url("/home");
                            };
                            

                            document.addEventListener('deviceready', onDeviceReady, false);


                            function onDeviceReady() { 
                                $("#loading-id").append("<div class='log-info'>" + "onDeviceReady " + " </div>");
                               /* var val = "/Package/Image/";

                                alert(val.substring(1, val.length))*/;
                                
                                  window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, onRequestFileSystemSuccess, null);
                            }
                            
                            function onRequestFileSystemSuccess(fileSystem) {
                                $("#loading-id").append("<div class='log-info'>" + "onRequestFileSystemSuccess " + " </div>");
                                window.fileSystemGlobal = fileSystem;
                                 

                                $scope.LoginfoArr.push("root : " + window.fileSystemGlobal.root.toNativeURL());
                                                              

                                $scope.LoginfoArr.push("request for service");
                                homeServiceModel.self.getPackage(function(packageModel) {

                                    $scope.Package = packageModel;

                                    var jsopStr = JSON.stringify($scope.Package);
                                    $scope.LoginfoArr.push(jsopStr);
                                    

                                    if ($scope.Package != null && window.fileSystemGlobal != null) {
                                        showUrlsToDownload($scope.Package);
                                        
                                     //   var url = "http://web421.newlinetechnologies.net/Content/6.12.15/Sunflower/SUNFLOW001_Motion_003.png";
                                     

                                      //  var File_Name = "SUNFLOW001_Motion_003.png";
                                      //  var folderName = "Package/Image/";
                                      //  var folderName = "/Content/6.12.15/Sunflower/";
                                        var imagePathOnserver = $scope.Package.Pages[0].ContentPage[0].LinkToImage;
                                        
                                        var url = window.serviceLink +  imagePathOnserver.substring(1, imagePathOnserver.length);
                                        
                                        $scope.LoginfoArr.push("DownloadImage  url " + url);
                                        

                                        var pathOnServer = $scope.Package.Pages[0].ContentPage[0].LinkToImage; // "/Content/6.12.15/Sunflower/SUNFLOW001_Motion_003.png";
                                        $scope.LoginfoArr.push("DownloadImage  url " + pathOnServer);
                                        
                                        fileManagerService.self.downLoadImageToStorage(url, pathOnServer);
                                    } else {
                                        $scope.LoginfoArr.push("$scope.Package is NULL");

                                    }
                                });
                            }
                            
 

                        }]);

}(window, window.angular));