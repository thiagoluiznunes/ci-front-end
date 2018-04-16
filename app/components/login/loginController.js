'use strict';

(function() {
  angular
    .module('ci-app')
    .controller('LoginCtrl', LoginController);

  LoginController.$inject =
    ['$http', '$location', 'loginFactory', 'consts', 'msgs'];

  function LoginController($http, $location, loginFactory, consts, msgs) {
    const vm = this;
    vm.user = {};

    vm.login = () => {
      loginFactory.login(vm.user, (err, response) => {
        if (err) return msgs.addError(err.errors);
        loginFactory.closeModal();
        msgs.addSuccess('Login realizado com sucesso!');
      });
    };

    vm.signup = () => {
      auth.signup(vm.user, (err, response) => {
        // err ? msgs.addError(err) : $location.path('/');
      });
    };
    vm.showModal = () => loginFactory.showModal();
  }
})();
