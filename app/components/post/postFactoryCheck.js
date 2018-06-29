'use strict';

(function() {
  angular
    .module('ci-app')
    .factory('checkFactory', CheckFactory);

  function CheckFactory() {
    let methods = {};

    methods.clearCheck = (...param) => {
      param[0].status = false;
      param[1].status = false;
      param[2] = null;
    };

    methods.checkBox = (vm, option, option2) => {
      if (vm[option].status) {
        vm[option2].status = false;
        vm.post.type = option === 'found' ? 'Achado' : 'Perdido';
      } else {
        vm.post.type = 'undefined';
      }
    };

    return methods;
  }
})();
