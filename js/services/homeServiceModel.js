/*global window */
(function (window, angular) {
    'use strict';

    angular
        .module(window.appName)
        .factory('homeServiceModel', ['packageRepository' ,
                            function (packageRepository ) {

            var _self = this;

            this.homeServiceModel = {
                Package: null,
                SelectedPage: null
            };
 
            packageRepository.getPackage(function (packageModel) {
                _self.homeServiceModel.Package = packageModel;
            });

            return {
                self: _self,
            }; 
        }]);
}(window, window.angular));