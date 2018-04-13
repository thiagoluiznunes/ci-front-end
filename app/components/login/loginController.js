'use strict';

(function() {
  angular
    .module('ci-app')
    .controller('LoginCtrl', LoginController);

  LoginController.$inject =
    ['$http', 'loginFactory', 'consts', 'msgs'];

  function LoginController($http, loginFactory, consts, msgs) {
    const vm = this;

    vm.login = () => {
      loginFactory.login(vm.user, (err) => {
        console.log(vm.user);
        // err ? msgs.addError(err) : $location.path('/');
      });
    };

    vm.signup = () => {
      auth.signup(vm.user, (err) => {
        // err ? msgs.addError(err) : $location.path('/');
        console.log(vm.user);
      });
    };
    vm.showModal = () => loginFactory.modal();
  }
})();
