'use strict';

(function() {
  angular
    .module('ci-app')
    .controller('PostCtrl', PostController);

  PostController.$inject =
    ['$http', '$interval', 'methods', 'consts', 'msgs'];

  function PostController($http, $interval, methods, consts, msgs) {
    const vm = this;

    vm.posts = {};
    vm.found = {status: false, name: 'found'};
    vm.lost = {status: false, name: 'lost'};
    vm.post = {};
    vm.floatButton = document.getElementById('floatButton');

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
      document.getElementById('checkbox_f').checked = false;
      document.getElementById('checkbox_l').checked = false;
    };
    vm.checkboxFound = () => {
      if (vm.found.status === false) {
        document.getElementById('checkbox_l').checked = false;
        vm.found.status = true;
        vm.lost.status = false;
        vm.post.type = 'Achado';
      } else {
        vm.found.status = false;
        vm.post.type = undefined;
      }
    };
    vm.checkboxLost = () => {
      if (vm.lost.status === false) {
        document.getElementById('checkbox_l').checked = false;
        vm.lost.status = true;
        vm.found.status = false;
        vm.post.type = 'Perdido';
      } else {
        vm.lost.status = false;
        vm.post.type = undefined;
      }
    };

    vm.refresh = () => {
      methods.get()
        .then((response) => {
          vm.posts = response.data.reverse();
        })
        .catch((response) => {
          msgs.addError(response.data.errors);
        });
    };

    vm.create = () => {
      methods.post(vm.post)
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
