'use strict';

(function() {
  angular
    .module('ci-app')
    .factory('postFactory', PostFactory);

  PostFactory.$inject =
    ['$http', 'consts', '$location'];

  function PostFactory($http, consts, $location) {
    let methods = {};

    methods.get = (callback) => {
      const page = parseInt($location.search().page) || 1;

      $http.get(`${consts.oapiUrl}/item/${(page - 1) * 10}/10`)
        .then((response) => {
          console.log(response);
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
