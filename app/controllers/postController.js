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
    vm.post = null;
    vm.found = 'found';
    vm.lost = 'lost';
    vm.floatButton = document.getElementById('floatButton');

    vm.addPost = () => {
      vm.clearCheck();
      $('#myModal').modal('show');
    };

    vm.confirm = () => {
      console.log(post);
      // vm.create();
    };

    vm.clearCheck = () => {
      document.getElementById('checkbox_f').checked = false;
      document.getElementById('checkbox_l').checked = false;
    };

    vm.checkbox = (param) => {
      if (param === 'found') {
        document.getElementById('checkbox_l').checked = false;
      } else {
        document.getElementById('checkbox_f').checked = false;
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
        })
        .catch((response) => {
          msgs.addError(response.data.errors);
        });
    };
    vm.teste = () => {
      $http.post(`${consts.oapiUrl}/item`, vm.mok)
        .then((response) => {
          vm.refresh();
        })
        .catch((response) => {
          msgs.addError(response.data.errors);
        });
    };
    vm.refresh();

    $interval(() => {
      vm.refresh();
    }, 50000);
  }
})();
