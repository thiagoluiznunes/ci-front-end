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
    vm.floatButton = document.getElementById('floatButton');
    vm.check_f = 'found';
    vm.check_l = 'lost';

    vm.addPost = () => {
      $('#myModal').modal('show');
    };

    vm.checkbox = (param) => {
      console.log(param);
      // if (param === 'found') {
      //   console.log('oi');
      // } else {
      //   console.log('oi 2');
      // }
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
