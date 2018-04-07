'use strict';

(function() {
  angular
    .module('ci-app')
    .factory('postfactory', PostFactory);

  PostFactory.$inject =
    ['$http', 'consts'];

  function PostFactory($http, consts) {
    let methods = {};
    const url = `${consts.oapiUrl}/item`;

    methods.checkboxFound = (...params) => {
      if (params[0].status) {
        params[1].status = false;
        params[2].type = 'Achado';
      } else params[2].type = undefined;
    };

    methods.checkboxLost = (...params) => {
      if (params[1].status) {
        params[0].status = false;
        params[2].type = 'Perdido';
      } else params[2].type = undefined;
    };

    methods.get = (callback) => {
      $http.get(url)
        .then((response) => {
          if (callback) callback(null, response.data.reverse());
        })
        .catch((response) => {
          if (callback) callback(response.data.errors);
        });
    };

    methods.post = (obj, callback) => {
      $http.post(url, obj)
        .then((response) => {
          if (callback) callback(null, true);
        })
        .catch((response) => {
          if (callback) callback(response.data.errors);
        });
    };

    return methods;
  }
})();
