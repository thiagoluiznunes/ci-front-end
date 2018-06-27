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

    initiVariables(vm);

    vm.getUser = () => injections[2].getUser();

    vm.login = () => login(vm, injections[1], injections[2], injections[3]);

    vm.signup = () => signup(vm, injections[2], injections[3]);

    vm.logout = () => logout(injections[1], injections[2]);

    vm.forgot = () => {};

    vm.showLogin = () => showLogin(vm, injections[5]);

    vm.showSignUp = () => showSignup(vm, injections[5]);

    vm.showForgot = () => showForgot(vm);
  }

  function initiVariables(vm) {
    vm.loginMode = undefined;
    vm.signupMode = undefined;
    vm.forgotMode = undefined;
  }

  function login(vm, windowInjection, loginFactory, msgs) {
    loginFactory.login(vm.user, (err, response) => {
        if (err) return msgs.addError(err.errors);
        windowInjection.location.reload();
      });
  }

  function signup(vm, loginFactory, msgs) {
    loginFactory.signup(vm.user, (err, response) => {
      if (err) return msgs.addError(err.errors);
      vm.login();
    });
  }

  function logout(windowInjection, loginFactory) {
    loginFactory.logout();
    windowInjection.location.reload();
  }

  function showLogin(vm, modalFactory) {
    vm.loginMode = true;
    vm.signupMode = false;
    vm.forgotMode = false;
    modalFactory.showLogin();
  }

  function showSignup(vm, modalFactory) {
    vm.loginMode = false;
    vm.signupMode = true;
    vm.forgotMode = false;
    modalFactory.showLogin();
  }

  function showForgot(vm) {
    vm.loginMode = false;
    vm.signupMode = false;
    vm.forgotMode = true;
  }

  function LoginRunBlock(...injections) {
    injections[2].validateUser();
    injections[0].$on('$locationChangeStart', () => {
      injections[2].validateUser();
    });
  }
})();
