'use strict';

(function() {
  angular
    .module('ci-app')
    .factory('msgs', MsgsFactory);

  MsgsFactory.$inject = ['toastr'];

  function MsgsFactory(toastr) {
    function addMsg(msgs, title, method) {
      // Captures all message
      if (msgs instanceof Array) {
        msgs.forEach((msg) => toastr[method](msg, title));
      } else {
        toastr[method](msgs, title);
      }
    }
    /* Show success message method*/
    function addSuccess(msgs) {
      addMsg(msgs, 'Sucesso', 'success');
    }
    /* Show warning message method*/
    function addWarning(msgs) {
      addMsg(msgs, 'Warning', 'warning');
    }
    /* Show error message method*/
    function addError(msgs) {
      addMsg(msgs, 'Erro', 'error');
    }
    return {addSuccess, addError, addWarning};
  }
})();
