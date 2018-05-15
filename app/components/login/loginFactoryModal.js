'use strict';

(function() {
  angular
    .module('ci-app')
    .factory('modalFactory', ModalFactory);

  function ModalFactory() {
    let methods = {};

    methods.showLogin = () => {
      $('#loginModal').modal('show');
    };

    methods.showSignUp = () => {
      $('#signupModal').modal('show');
    };

    return methods;
  }
})();
