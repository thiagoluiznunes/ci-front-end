'use strict';

(function() {
  angular
    .module('ci-app')
    .factory('validateFactory', ValidateFactory);

  ValidateFactory.$inject =
    ['$http', 'consts', 'loginFactory'];

  function ValidateFactory($http, consts, loginFactory) {
    const vm = this;

    vm.methods = {};

    vm.methods.validateToken = (token, callback) => {
      validateToken(token, callback, $http, consts, loginFactory);
    };

    // vm.methods.validateToken = (token, callback) => {
    //   if (token) {
    //     $http.post(`${consts.oapiUrl}/validateToken`, {token})
    //       .then((response) => {
    //         if (!response.data.valid) {
    //           console.log('Error validate response, logout is called');
    //           loginFactory.logout();
    //         } else {
    //           $http.defaults.headers.common.Authorization =
    //             loginFactory.getUser().token;
    //           if (callback) callback(null, response.data.valid);
    //         }
    //       })
    //       .catch((response) => {
    //         if (callback) callback(response.data);
    //       });
    //   } else {
    //     if (callback) callback('Invalid token!');
    //   }
    // };

    vm.methods.validateUser = () => {
      let user = loginFactory.getUser();
      if (user && !user.isValid) {
        vm.methods.validateToken(user.token, (err, valid) => {
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

    return vm.methods;
  }

  function validateToken(token, callback, ...params) {
    if (token) {
      params[0].post(`${params[1].oapiUrl}/validateToken`, {token})
        .then((response) => {
          if (!response.data.valid) {
            console.log('Error validate response, logout is called');
            params[2].logout();
          } else {
            params[0].defaults.headers.common.Authorization =
              params[2].getUser().token;
            if (callback) callback(null, response.data.valid);
          }
        })
        .catch((response) => {
          if (callback) callback(response.data);
        });
    } else {
      if (callback) callback('Invalid token!');
    }
  }
})();
