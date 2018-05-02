'use strict';

(function() {
  angular
    .module('ci-app')
    .controller('LoginCtrl', LoginController)
    .run(LoginRunBlock);

  LoginController.$inject =
    ['$http', '$location', 'loginFactory', 'msgs', 'consts'];
  LoginRunBlock.$inject =
    ['loginFactory'];

  function LoginController(...injections) {
    const vm = this;
    vm.user = {};

    vm.login = () => {
      injections[2].login(vm.user, (err, response) => {
        if (err) return injections[4].addError(err.errors);
        injections[2].closeModal();
        injections[3].addSuccess('Login realizado com sucesso!');
      });
    };

    vm.signup = () => {
      auth.signup(vm.user, (err, response) => {
        if (err) return injections[4].addError(err.errors);
        vm.login();
      });
    };
    vm.showModal = () => injections[2].showModal();
  }

  function LoginRunBlock(...injections) {
    console.log(injections[0].getUser());
  }
})();
