'use strict';

(function() {
  angular
    .module('ci-app')
    .controller('PostCtrl', PostController);

  PostController.$inject =
    ['$http', '$interval', 'postFactory', 'msgs', 'checkFactory'];

  function PostController(...injections) {
    const vm = this;

    vm.posts = {};
    vm.post = {};
    vm.found = {status: false, name: 'found'};
    vm.lost = {status: false, name: 'lost'};

    vm.confirm = () => vm.create();

    vm.clearCheck = () => injections[4].clearCheck(vm.found, vm.lost, vm.post);

    vm.addPost = () => {
      vm.clearCheck();
      $('#myModal').modal('show');
    };

    vm.checkboxFound = () => {
      injections[4].checkboxFound(vm.found, vm.lost, vm.post);
    };

    vm.cancel = () => {
      vm.post = {};
      vm.clearCheck();
    };

    vm.checkboxLost = () => {
      injections[4].checkboxLost(vm.found, vm.lost, vm.post);
    };

    vm.refresh = () => {
      injections[2].get((err, response) => {
        if (response) vm.posts = response;
        else injections[3].addError(err);
      });
    };

    vm.create = () => {
      injections[2].post(vm.post, (err, response) => {
        if (response) {
          injections[3].addSuccess('Item postado! :D');
          vm.cancel();
          vm.refresh();
        } else {
          injections[3].addError(err);
        }
      });
    };

    vm.refresh();

    injections[1](() => {
      vm.refresh();
    }, 50000);
  }
})();
