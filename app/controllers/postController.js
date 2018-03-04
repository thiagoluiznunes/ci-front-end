'use strict';

(function() {
  angular
    .module('ci-app')
    .controller('PostCtrl', PostController)
    .run(background);

  PostController.$inject =
    ['$http', 'methods', 'consts'];

  function PostController($http, methods, consts) {
    const vm = this;
    const url = `${consts.oapiUrl}/item`;
    vm.posts = {};

    vm.get = () => {
      $http.get(url)
        .then((response) => {
          console.log(response.data)
          vm.posts = response.data;
        })
        .catch((response) => {
          msgs.addError(response.data.errors);
        });
    }
    vm.get();
  }

  function background() {

  }
})();
