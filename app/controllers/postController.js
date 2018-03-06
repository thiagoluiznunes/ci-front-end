'use strict';

(function() {
  angular
    .module('ci-app')
    .controller('PostCtrl', PostController);

  PostController.$inject =
    ['$http', '$interval', 'methods', 'consts'];

  function PostController($http, $interval, methods, consts) {
    const vm = this;

    vm.posts = {};
    vm.found = 'found';
    vm.lost = 'lost';
    vm.floatButton = document.getElementById('floatButton');
    vm.checkbox_f = document.getElementById('checkbox_f');
    vm.checkbox_l = document.getElementById('checkbox_l');

    vm.addPost = () => {
      $('#myModal').modal('show');
    };

    vm.checkbox = (param) => {
      if (param === 'found') {
        document.getElementById('checkbox_l').checked = false;
      } else {
        document.getElementById('checkbox_f').checked = false;
      }
    };

    vm.get = () => {
      methods.get().then((response) => {
        vm.posts = response.data.reverse();
      });
    };
    vm.get();

    $interval(() => {
      vm.get();
    }, 50000);
  }
})();
