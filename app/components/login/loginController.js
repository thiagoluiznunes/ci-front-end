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

    vm.showForgot = () => showForgot(vm, injections[5]);
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
    modalFactory.setOptions(vm, 'login');
    modalFactory.showModal();
  }

  function showSignup(vm, modalFactory) {
    modalFactory.setOptions(vm, 'signup');
    modalFactory.showModal();
  }

  function showForgot(vm, modalFactory) {
    modalFactory.setOptions(vm);
  }

  function LoginRunBlock(...injections) {
    injections[2].validateUser();
    injections[0].$on('$locationChangeStart', () => {
      injections[2].validateUser();
    });
  }
})();
