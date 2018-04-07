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

    // methods.checkboxFound = (...params) => {
    //   if (params.found.status) {
    //     params.lost.status = false;
    //     params.post.type = 'Achado';
    //     // return params;
    //   } else {
    //     params.post.type = undefined;
    //     // return params;
    //   }
    //   params.callback(null, {'lost': params.lost, 'found': params.found});
    // };

    // methods.checkboxLost = (...params) => {
    //   if (params.lost.status) {
    //     params.found.status = false;
    //     params.post.type = 'Perdido';
    //     return {params};
    //   }
    //   post.type = undefined;
    //   return {params};
    // };

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
