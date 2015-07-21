/*global window */
(function (window, angular) {
    'use strict';

    angular
        .module(window.appName)
            .service('viewSlideIndex', ['$location', '$rootScope', function ($location, $rootScope) {
                var viewIndex;
                return {
                    getViewIndex: function () {
                        return viewIndex;
                    },
                    setViewIndex: function (val) {
                        viewIndex = val;
                    },
                    slideView: function (index, url) {
                        var scrolled = window.pageYOffset || document.documentElement.scrollTop;

                        $('.sroll-item').css("position", 'absolute');
                        $('.sroll-item').css("margin-top", scrolled + "px");

                        if (this.getViewIndex() > index) {
                            $rootScope.slideDir = 'slide-right';
                        } else {

                            $rootScope.slideDir = 'slide-left';
                        }
                        ;
                        this.setViewIndex(index);
                        
                        $location.url(url);
                    }
                };
            }]);
    

}(window, window.angular));