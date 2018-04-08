'use strict';

(function() {
  angular
    .module('ci-app')
    .factory('loginfactory', LoginFactory);

  LoginFactory.$inject =
    ['$http', 'consts'];

  function LoginFactory($http, consts) {
    let methods = {};
    const url = `${consts.oapiUrl}/item`;

    methods.modal = () => {
      $('#loginModal').modal('show');
    };

    return methods;
  }
})();
