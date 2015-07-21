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
 
            packageRepository.getPackage(function (packageModel) {
                
      /*          var packageModelWithLocalPath = fileManagerService.self.downloadImage(packageModel);
                _self.homeServiceModel.Package = packageModelWithLocalPath;*/

                _self.homeServiceModel.Package = packageModel;
            });

            return {
                self: _self,
            }; 
        }]);
}(window, window.angular));