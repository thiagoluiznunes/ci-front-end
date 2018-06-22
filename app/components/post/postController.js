'use strict';

(function() {
  angular
    .module('ci-app')
    .controller('PostCtrl', PostController);

  PostController.$inject = ['$interval', 'postFactory',
                            'msgs', 'checkFactory', 'loginFactory'];

  function PostController(...injections) {
    const vm = this;

    vm.posts = {};
    vm.post = {};
    vm.found = {status: false, name: 'found'};
    vm.lost = {status: false, name: 'lost'};

    vm.getUser = () => injections[4].getUser();

    vm.confirm = () => vm.create();

    vm.clearCheck = () => injections[3].clearCheck(vm.found, vm.lost, vm.post);

    vm.addPost = () => {
      vm.clearCheck();
      console.log('modal');
      $('#postModal').modal('show');
    };

    vm.checkboxFound = () => {
      injections[3].checkboxFound(vm.found, vm.lost, vm.post);
    };

    vm.cancel = () => {
      vm.post = {};
      vm.clearCheck();
    };

    vm.checkboxLost = () => {
      injections[3].checkboxLost(vm.found, vm.lost, vm.post);
    };

    vm.refresh = () => {
      injections[1].get((err, response) => {
        if (response) vm.posts = response;
        else injections[2].addError(err);
      });
    };

    vm.create = () => {
      injections[1].post(vm.post, (err, response) => {
        if (response) {
          injections[2].addSuccess('Item postado! :D');
          vm.cancel();
          vm.refresh();
        } else {
          injections[2].addError(err);
        }
      });
    };

    vm.refresh();

    injections[0](() => {
      vm.refresh();
    }, 50000);
  }
})();
