/*global window */
(function (window, angular) {
    'use strict';

    angular
        .module(window.appName)
        .controller('loadingCtrl', ['$scope', 'fileManagerService', 'homeServiceModel', '$location',
                        function ($scope, fileManagerService, homeServiceModel, $location) {

                            $scope.Package = null;
                            $scope.LoginfoArr = [];

                            $scope.$watch(function () {
                                return homeServiceModel.self.homeServiceModel.Package;
                            }, function (newVal, oldVal) {
                                $scope.Package = newVal;
                                

                                $scope.LoginfoArr.push("request device");
                                
                                if ($scope.Package != null) {
                                    $scope.LoginfoArr.push("response Json");

                                   var jsopStr = JSON.stringify($scope.Package );
                                   $scope.LoginfoArr.push(jsopStr);

                                   showUrlsToDownload($scope.Package);
                                   fileManagerService.self.downloadImageByLink($scope.Package.Pages[0].ContentPage[0].LinkToImage);
                                }
                            });
                            
                            document.addEventListener("deviceready", onDeviceReady, false);

                            function onDeviceReady() {
                                $scope.LoginfoArr.push("onDeviceReady");
                                window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, onRequestFileSystemSuccess, null);
                            }

                            function onRequestFileSystemSuccess(fileSystem) {
                              /*  alert("onRequestFileSystemSuccess");
                                window.fileSystemGlobal = fileSystem;

                                var pathToVault = window.fileSystemGlobal.root.toURL();
                                alert(pathToVault);*/
                                $scope.LoginfoArr += "onRequestFileSystemSuccess";
                            }

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

                        }]);

}(window, window.angular));