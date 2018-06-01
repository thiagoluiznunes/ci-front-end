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
      param[2].type = undefined;
    };

    methods.checkboxFound = (...params) => {
      if (params[0].status) {
        params[1].status = false;
        params[2].type = 'Achado';
      } else params[2].type = undefined;
    };

    methods.checkboxLost = (...params) => {
      if (params[1].status) {
        params[0].status = false;
        params[2].type = 'Perdido';
      } else params[2].type = undefined;
    };

    return methods;
  }
})();