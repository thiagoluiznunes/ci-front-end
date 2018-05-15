'use strict';

(function() {
  angular
    .module('ci-app')
    .factory('validateFactory', ValidateFactory);

  ValidateFactory.$inject =
    ['$http', 'consts', 'loginFactory'];

  function ValidateFactory($http, consts, loginFactory) {
    let methods = {};

    methods.validateToken = (token, callback) => {
      if (token) {
        $http.post(`${consts.oapiUrl}/validateToken`, {token})
          .then((response) => {
            if (!response.data.valid) {
              console.log('Error validate response, logout is called');
              methods.logout();
            } else {
              $http.defaults.headers.common.Authorization =
                loginFactory.getUser().token;
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
      let user = loginFactory.getUser();
      if (user && !user.isValid) {
        methods.validateToken(user.token, (err, valid) => {
          if (err) {
            console.log('User is not valid');
          } else {
            console.log('User is valid');
            user.isValid = true;
            $http.defaults.headers.common.Authorization = user.token;
          }
        });
      }
    };

    return methods;
  }
})();
