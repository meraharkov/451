/*global window */
(function (window, angular) {
    'use strict';

    angular
        .module(window.appName)
        .controller('mainCtrl', ['$scope', '$location', 'viewSlideIndex', 'homeServiceModel',
                        function ($scope, $location, viewSlideIndex, homeServiceModel) {

                           $scope.isHomePage = false;
                           $scope.isTitlePage = false;
                           $scope.Package = null;
                           $scope.host = window.serviceLink;

                           $scope.slideView = function (index, url, page) {

                               homeServiceModel.self.SelectedPage = page;
                               viewSlideIndex.slideView(index, url);
                           };

                           $scope.$watch(function () {
                               return homeServiceModel.self.homeServiceModel.Package;
                           }, function (newVal, oldVal) {
                               $scope.Package = newVal;
                           });

                           $scope.getImage = function (url) {
                               return window.serviceLink + url;
                           };

                       }]);

}(window, window.angular));