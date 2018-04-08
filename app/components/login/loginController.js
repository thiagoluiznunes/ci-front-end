'use strict';

(function() {
  angular
    .module('ci-app')
    .controller('LoginCtrl', LoginController);

  LoginController.$inject =
    ['$http', 'loginfactory', 'consts', 'msgs'];

  function LoginController($http, loginfactory, consts, msgs) {
    const vm = this;

    vm.showModal = () => loginfactory.modal();
  }
})();
