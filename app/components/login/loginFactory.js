'use strict';

(function() {
  angular
    .module('ci-app')
    .factory('loginFactory', LoginFactory);

  LoginFactory.$inject =
    ['$http', 'consts'];

  function LoginFactory($http, consts) {
    let methods = {};
    let user = null;

    methods.showModal = () => {
      $('#loginModal').modal('show');
    };

    methods.closeModal = () => {
      $('#loginModal').modal('hide');
    };

    methods.getUser = () => {
      if (!user) {
        user = JSON.parse(localStorage.getItem(consts.userKey));
      }
      return user;
    };

    methods.login = (user, callback) => {
      methods.submit('login', user, callback);
    };

    methods.signup = (user, callback) => {
      methods.submit('signup', user, callback);
    };

    methods.submit = (url, user, callback) => {
     $http.post(`${consts.oapiUrl}/${url}`, user)
        .then((response) => {
          if (callback) callback(null, response.data);
        })
        .catch((response) => {
          if (callback) callback(response.data);
        });
    };

    return methods;
  }
})();
