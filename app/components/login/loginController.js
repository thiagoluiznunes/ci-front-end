'use strict';

(function() {
  angular
    .module('ci-app')
    .controller('LoginCtrl', LoginController)
    .run(LoginRunBlock);

  LoginController.$inject =
    ['$http', '$window', 'loginFactory', 'msgs', 'consts'];
  LoginRunBlock.$inject =
    ['$rootScope', '$location', 'loginFactory'];

  function LoginController(...injections) {
    const vm = this;

    vm.getUser = () => injections[2].getUser();

    vm.login = () => {
      injections[2].login(vm.user, (err, response) => {
        if (err) return injections[3].addError(err.errors);
        injections[1].location.reload();
      });
    };

    vm.signup = () => {
      injections[2].signup(vm.user, (err, response) => {
        if (err) return injections[3].addError(err.errors);
        vm.login();
      });
    };

    vm.logout = () => {
      injections[2].logout();
      injections[1].location.reload();
    };

    vm.showLogin = () => injections[2].showLogin();

    vm.showSignUp = () => injections[2].showSignUp();
  }

  function LoginRunBlock(...injections) {
    injections[2].validateUser();
    injections[0].$on('$locationChangeStart', () => {
      injections[2].validateUser();
    });
  }
})();
