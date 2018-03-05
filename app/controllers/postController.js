'use strict';

(function() {
  angular
    .module('ci-app')
    .controller('PostCtrl', PostController);

  PostController.$inject =
    ['$http', '$interval', 'consts'];

  function PostController($http, $interval, consts) {
    const vm = this;
    const url = `${consts.oapiUrl}/item`;
    vm.posts = {};
    vm.floatButton = document.getElementById('floatButton');

    vm.addPost = () => {
      $('#myModal').modal('show');
    };

    vm.get = () => {
      $http.get(url)
        .then((response) => {
          vm.posts = response.data.reverse();
        })
        .catch((response) => {
          msgs.addError(response.data.errors);
        });
    };
    vm.get();

    $interval(() => {
      vm.get();
    }, 50000);
  }
})();
