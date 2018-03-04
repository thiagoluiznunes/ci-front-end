'use strict';

(function() {
  angular
    .module('ci-app')
    .controller('PostCtrl', PostController);

  PostController.$inject =
    ['$http', 'consts'];

  function PostController($http, consts) {
    const vm = this;

    vm.posts = [];
    vm.post = {
      type: 'My conversion day',
      description: 'It was a night of Sunday when I gave my life to Jesus!',
      name: 'Thiago Luiz',
      contact: 'https://www.facebook.com/thiagoluizsurf',
      data: '18/02/1993'
    };
  }
})();