/*global window */
(function (window, angular) {
    'use strict';

    angular
        .module(window.appName)
        .controller('loadingCtrl', ['$scope', 'fileManagerService', 'homeServiceModel', '$location',
                        function ($scope, fileManagerService, homeServiceModel, $location) {

                            $scope.Package = null;
                            $scope.LoginfoArr = [];

                          //  $scope.globalobjectsarray = { Package: null, fileSystemGlobal: null };
                                                       

                          /*  $scope.$watch(function () {
                                return homeServiceModel.self.homeServiceModel.Package;
                            }, function (newVal, oldVal) {
                                $scope.Package = newVal;
                                $scope.globalobjectsarray.Package = newVal;

                                $scope.LoginfoArr.push("request device");
                                
                                if ($scope.Package != null) {
                                    $scope.LoginfoArr.push("response Json");

                                   var jsopStr = JSON.stringify($scope.Package );
                                   $scope.LoginfoArr.push(jsopStr);

                                   showUrlsToDownload($scope.Package);
                                   
                                }
                            });*/
                             

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
                                alert("onDeviceReady 6");
                                $("#loading-id").append("<div class='log-info'>" + "onDeviceReady " + " </div>");
                               // onRequestFileSystemSuccess({});
                                  window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, onRequestFileSystemSuccess, null);
                            }
                            
                            function onRequestFileSystemSuccess(fileSystem) {
                                alert("onRequestFileSystemSuccess");
                                window.fileSystemGlobal = fileSystem;
                                 

                                alert("root : " + window.fileSystemGlobal.root.toNativeURL());
                                $("#loading-id").append("<div class='log-info'>" + "onRequestFileSystemSuccess " + " </div>");                                

                                $scope.LoginfoArr.push("request device");
                                homeServiceModel.self.getPackage(function(packageModel) {

                                    $scope.Package = packageModel;

                                    var jsopStr = JSON.stringify($scope.Package);
                                    $scope.LoginfoArr.push(jsopStr);
                                    

                                    if ($scope.Package != null && window.fileSystemGlobal != null) {
                                        alert("$scope.Package != null && window.fileSystemGlobal != null");
                                        fileManagerService.self.downloadImageByLink($scope.Package.Pages[0].ContentPage[0].LinkToImage);
                                    } else {
                                        $scope.LoginfoArr.push("$scope.Package is NULL");

                                    }
                                });


                            }
                            


                       /*     $scope.$watch( function() {
                                return $scope.globalobjectsarray;
                            }, function (newVal, oldVal) {

                                $scope.LoginfoArr.push("$watch $scope.Package : "
                                    + JSON.stringify($scope.Package)
                                    + " $watch window.fileSystemGlobal :  "
                                    + JSON.stringify(window.fileSystemGlobal));


                                if ($scope.Package != null && window.fileSystemGlobal != null) {
                                    alert("$scope.Package != null && window.fileSystemGlobal != null");
                                    fileManagerService.self.downloadImageByLink($scope.Package.Pages[0].ContentPage[0].LinkToImage);
                                } else {
                                    $scope.LoginfoArr.push("$scope.Package is NULL");

                                }
                            },true
                          );*/

                        }]);

}(window, window.angular));