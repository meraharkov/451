/*global window */
(function (window, angular) {
    'use strict';

    angular
        .module(window.appName)
        .factory('homeServiceModel', ['packageRepository', 'fileManagerService',
                            function (packageRepository, fileManagerService) {

            var _self = this;

            this.homeServiceModel = {
                Package: null,
                SelectedPage: null
            };


            this.getPackage = function( response) {
                packageRepository.getPackage(function (packageModel) {
                    response(packageModel);
                    // _self.homeServiceModel.Package = packageModel;
                });
            };
                      

            return {
                self: _self,
            }; 
        }]);
}(window, window.angular));