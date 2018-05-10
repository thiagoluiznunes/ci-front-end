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
          localStorage.setItem(consts.userKey, JSON.stringify(response.data));
          if (callback) callback(null, response.data);
        })
        .catch((response) => {
          if (callback) callback(response.data);
        });
    };

    methods.logout = (callback) => {
      user = null;
      localStorage.removeItem(consts.userKey);
      $http.defaults.headers.common.Authorization = '';
      if (callback) callback(null);
    };

    methods.validateToken = (token, callback) => {
      if (token) {
        $http.post(`${consts.oapiUrl}/validateToken`, {token})
          .then((response) => {
            if (!response.data.valid) {
              console.log('Error validate response, logout is called');
              methods.logout();
            } else {
              console.log('ok');
              // $http.defaults.headers.common.Authorization = getUser().token;
              if (callback) callback(null, response.data.valid);
            }
          })
          .catch((response) => {
            if (callback) callback(response.data);
          });
      } else {
        if (callback) callback('Invalid token!');
      }
    };

    methods.validateUser = () => {
      methods.validateToken(methods.getUser().userToken, (err, response) => {
        if (err) return false;
        return true;
      });
    };

    return methods;
  }
})();
