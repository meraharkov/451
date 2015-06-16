/*global window */
(function (window, angular) {
    'use strict';

    angular
        .module(window.appName)
            .service('viewSlideIndex', function () {
                var viewIndex;
                return {
                    getViewIndex: function () {
                        return viewIndex;
                    },
                    setViewIndex: function (val) {
                        viewIndex = val;
                    }
                };
            });
    

}(window, window.angular));