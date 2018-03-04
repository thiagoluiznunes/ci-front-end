'use strict';

(function() {
  angular
    .module('ci-app')
    .factory('methods', MethodsFactory);

  MethodsFactory.$inject =
    ['$http', 'consts'];

  function MethodsFactory($http, consts) {
    let data = null;
    function get(url) {
      $http.get(`${consts.oapiUrl}/item`)
        .then((response) => {
          data = response.data;
        })
        .catch((response) => {
        });
        return data;
    }

    return {get};
  }
})();
