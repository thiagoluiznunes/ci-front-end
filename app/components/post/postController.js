'use strict';

(function() {
  angular
    .module('ci-app')
    .controller('PostCtrl', PostController);

  PostController.$inject =
    ['$http', '$interval', 'postfactory', 'consts', 'msgs'];

  function PostController($http, $interval, postfactory, consts, msgs) {
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
      postfactory.checkboxFound(vm.found, vm.lost, vm.post);
    };

    vm.checkboxLost = () => {
      postfactory.checkboxLost(vm.found, vm.lost, vm.post);
    };

    vm.refresh = () => {
      postfactory.get((err, response) => {
        if (response) vm.posts = response;
        else msgs.addError(err);
      });
    };

    vm.create = () => {
      postfactory.post(vm.post, (err, response) => {
        if (response) {
          vm.refresh();
          vm.cancel();
          msgs.addSuccess('Item postado! :D');
        } else {
          msgs.addError(err);
        }
      });
    };

    vm.refresh();

    $interval(() => {
      vm.refresh();
    }, 50000);
  }
})();
