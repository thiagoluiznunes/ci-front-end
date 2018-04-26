'use strict';

(function() {
  angular
    .module('ci-app')
    .controller('PostCtrl', PostController);

  PostController.$inject =
    ['$http', '$interval', 'postfactory', 'msgs'];

  // function PostController($http, $interval, postfactory, msgs) {
  function PostController(...injections) {
    const vm = this;

    vm.posts = {};
    vm.found = {status: false, name: 'found'};
    vm.lost = {status: false, name: 'lost'};
    vm.post = {};

    vm.addPost = () => {
      vm.clearCheck();
      $('#myModal').modal('show');
    };

    vm.confirm = () => {
      vm.create();
    };

    vm.cancel = () => {
      vm.post = null;
      vm.clearCheck();
    };

    vm.clearCheck = () => {
      vm.found.status = false;
      vm.lost.status = false;
      vm.post.type = undefined;
    };

    vm.checkboxFound = () => {
      injections[2].checkboxFound(vm.found, vm.lost, vm.post);
    };

    vm.checkboxLost = () => {
      injections[2].checkboxLost(vm.found, vm.lost, vm.post);
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
          vm.refresh();
          vm.cancel();
          injections[3].addSuccess('Item postado! :D');
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
