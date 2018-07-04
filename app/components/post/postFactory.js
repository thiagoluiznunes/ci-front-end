'use strict';

(function() {
  angular
    .module('ci-app')
    .factory('postFactory', PostFactory);

  PostFactory.$inject =
    ['$http', 'consts'];

  function PostFactory($http, consts) {
    let methods = {};

    methods.get = (callback) => {
      $http.get(`${consts.oapiUrl}/item`)
        .then((response) => {
          if (callback) callback(null, response.data.reverse());
        })
        .catch((response) => {
          if (callback) callback(response.data.errors);
        });
    };

    methods.post = (obj, callback) => {
      console.log(obj);
      $http.post(`${consts.apiUrl}/item`, obj)
        .then((response) => {
          if (callback) callback(null, true);
        })
        .catch((response) => {
          if (callback) callback(response.data.errors);
        });
    };

    methods.count = () => {
      $http.get(`${consts.oapiUrl}/count`)
        .then((response) => response)
        .catch((response) => response.data.errors);
    };

    return methods;
  }
})();
