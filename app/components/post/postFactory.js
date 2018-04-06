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

    methods.get = () => {
      return $http.get(url);
    };
    methods.post = (obj) => {
      return $http.post(url, obj);
    };
    return methods;
  }
})();
