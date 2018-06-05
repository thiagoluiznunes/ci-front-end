'use strict';

(function() {
  angular
    .module('ci-app')
    .controller('LoginCtrl', LoginController)
    .run(LoginRunBlock);

  LoginController.$inject =
    ['$http', '$window', 'loginFactory', 'msgs', 'consts', 'modalFactory'];
  LoginRunBlock.$inject =
    ['$rootScope', '$location', 'validateFactory'];

  function LoginController(...injections) {
    const vm = this;

    vm.loginMode = undefined;
    vm.signupMode = undefined;
    vm.forgotMode = undefined;

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

    vm.forgot = () => {

    };

    vm.showLogin = () => {
      vm.loginMode = true;
      vm.signupMode = false;
      vm.forgotMode = false;
      injections[5].showLogin();
    };

    vm.showSignUp = () => {
      vm.loginMode = false;
      vm.signupMode = true;
      vm.forgotMode = false;
      injections[5].showLogin();
    };

    vm.showForgot = () => {
      vm.loginMode = false;
      vm.signupMode = false;
      vm.forgotMode = true;
    };
  }

  function LoginRunBlock(...injections) {
    injections[2].validateUser();
    injections[0].$on('$locationChangeStart', () => {
      injections[2].validateUser();
    });
  }
})();
