/*global window*/
(function (window, angular) {
    'use strict';

    angular
        .module(window.appName)
        .factory('serverApi', ['$http', '$log',
            function ($http, $log) {
                var request = function (method, resource, entity, parameters) {
                    var response = {},
                        successFn = function () { },
                        errorFn = function () { };

                    response.success = function (fn) { successFn = fn; };
                    response.error = function (fn) { errorFn = fn; };
                    
                    var urlForrequest = window.serviceLink + resource;

                 /*   $http({
                        method: method,
                        url:  resource,
                        params: parameters,
                        data: entity,
                        headers: { 'Content-Type': 'application/json' }
                    })
                        .success(function (data, status, headers, config) {
                            successFn(data, status, headers, config);
                        })
                        .error(function (data, status, header, config) {
                            errorFn(data, status, header, config);

                            $log.warn(data, status, header, config);
                        });*/
                    

                    switch (method) {
                        case "GET":
                            $http.get(urlForrequest)
                              .success(function (data, status, headers, config) {
                                   successFn(data, status, headers, config);
                              })
                              .error(function (data, status, headers, config) {
                                   errorFn(data, status, header, config);
                              });
                            break;
                        case "POST":
                            $http.post(urlForrequest, entity)
                            .success(function (data, status, headers, config) {
                                successFn(data, status, headers, config);
                            })
                            .error(function (data, status, headers, config) {
                               errorFn(data, status, header, config);
                            });
                            break;
                        
                    default:
                    }
                     
                    return response;
                };

                return {
                    get: function (resource, parameters) {

                        return request('GET', resource, null, parameters);
                    },

                    post: function (resource, entity) {
                        return request('POST', resource, entity, null);
                    },

                    put: function (resource, entity) {
                        return request('PUT', resource, entity, null);
                    },

                    remove: function (resource, entity) {
                        return request('DELETE', resource, entity, null);
                    }
                };
            }]);
}(window, window.angular));