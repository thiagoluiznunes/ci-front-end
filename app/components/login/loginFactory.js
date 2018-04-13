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

    methods.modal = () => {
      $('#loginModal').modal('show');
    };

    methods.getUser = () => {
      if (!user) {
        user = JSON.parse(localStorage.getItem(consts.userKey));
      }
      return user;
    };

    methods.login = (user, callback) => {
      submit('login', user, callback);
    };

    methods.signup = (user, callback) => {
      submit('signup', user, callback);
    };

    methods.submit = (url, user, callback) => {
     $http.post(`${consts.oapi}/${url}`, user)
        .then((response) => {
          console.log(response.data);
        })
        .catch((response) => {
          console.log('');
        });
    };

    return methods;
  }
})();
