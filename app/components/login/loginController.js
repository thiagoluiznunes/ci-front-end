'use strict';

(function() {
  angular
    .module('ci-app')
    .controller('LoginCtrl', LoginController)
    .run(LoginRunBlock);

  LoginController.$inject =
    ['$http', '$location', 'loginFactory', 'msgs', 'consts', '$window'];
  LoginRunBlock.$inject =
    ['$rootScope', '$location', '$window', '$state', 'loginFactory'];

  function LoginController(...injections) {
    const vm = this;

    vm.getUser = () => injections[2].getUser();

    vm.login = () => {
      injections[2].login(vm.user, (err, response) => {
        if (err) return injections[4].addError(err.errors);
        injections[2].closeModal();
        injections[3].addSuccess('Login realizado com sucesso!');
        injections[5].location.reload();
      });
    };

    vm.signup = () => {
      injections[2].signup(vm.user, (err, response) => {
        if (err) return injections[4].addError(err.errors);
        vm.login();
      });
    };

    vm.logout = () => {
      injections[2].logout();
      injections[5].location.reload();
    };

    vm.showModal = () => injections[2].showModal();
  }

  function LoginRunBlock(...injections) {
    injections[4].validateUser();
    injections[0].$on('$locationChangeStart', () => injections[4].validateUser());
  }
})();
