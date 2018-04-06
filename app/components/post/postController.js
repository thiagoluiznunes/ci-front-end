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
    };
    vm.checkboxFound = () => {
      if (vm.found.status) {
        vm.lost.status = false;
        vm.post.type = 'Achado';
      } else {
        vm.post.type = undefined;
      }
    };
    vm.checkboxLost = () => {
      if (vm.lost.status) {
        vm.found.status = false;
        vm.post.type = 'Perdido';
      } else {
        vm.post.type = undefined;
        console.log(vm.post.type);
      }
    };

    vm.refresh = () => {
      postfactory.get()
        .then((response) => {
          vm.posts = response.data.reverse();
        })
        .catch((response) => {
          msgs.addError(response.data.errors);
        });
    };

    vm.create = () => {
      postfactory.post(vm.post)
        .then((response) => {
          vm.refresh();
          msgs.addSuccess('Item postado! :D');
          vm.cancel();
        })
        .catch((response) => {
          let data = response.data.errors;
          for (let i = 0; i < Object.keys(data).length; i++) {
            msgs.addError(data[Object.keys(data)[i]].message);
          }
        });
    };

    vm.refresh();

    $interval(() => {
      vm.refresh();
    }, 50000);
  }
})();
