'use strict';

(function() {
  angular
    .module('ci-app')
    .controller('ModalCtrl', ModalController);

    function ModalController() {
      const vm = this;

      vm.data = {};
      vm.data.cb1 = true;
    }
})();
