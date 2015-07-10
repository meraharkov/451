/*global window */
(function (window, angular) {
    'use strict';

    angular
        .module(window.appName)
        .factory('packageRepository', ['serverApi', function (serverApi) {
            return {
                getPackage: function (successResponse) {
                    serverApi
                    .post("api/Package/GetPackage")
                    .success(function (packageModel) {
                        successResponse(packageModel);
                    });
                }
            };
        } ]);
} (window, window.angular));