'use strict';

(function() {
  angular
    .module('ci-app')
    .factory('modalFactory', ModalFactory);

  function ModalFactory() {
    let methods = {};

    methods.showModal = () => {
      $('#loginModal').modal('show');
    };

    methods.setOptions = (vm, option) => {
      if (option === 'login') {
        vm.loginMode = true;
        vm.signupMode = false;
        vm.forgotMode = false;
      } else if (option === 'signup') {
        vm.loginMode = false;
        vm.signupMode = true;
        vm.forgotMode = false;
      } else {
        vm.loginMode = false;
        vm.signupMode = false;
        vm.forgotMode = true;
      }
    };
    return methods;
  }
})();
