'use strict';

(function() {
  angular
    .module('ci-app')
    .controller('ModalCtrl', ModalController);

    function ModalController() {
      const vm = this;
      const post = null;

      vm.checkbox = () => {
          console.log('oi');
        if (param == 'found') {
          post.type = param;
        } else {
          post.type = param;
        }
      };
    }
})();
