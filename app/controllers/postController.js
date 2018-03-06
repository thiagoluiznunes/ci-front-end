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
    vm.found = 'found';
    vm.lost = 'lost';
    vm.floatButton = document.getElementById('floatButton');

    vm.addPost = () => {
      vm.create();
      vm.clearCheck();
      $('#myModal').modal('show');
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

    vm.mok = {
      type: 'Mok',
      description: 'Objeto mokado',
      name: 'Thiago Luiz Nunes',
      contact: 'facebook.com/thiagoluizsurf',
      data: '05/02'};

    vm.create = () => {
      methods.post(vm.mok)
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
