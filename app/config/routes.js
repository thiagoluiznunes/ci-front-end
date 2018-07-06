'use strict';

(function() {
  angular
    .module('ci-app')
    .config(configure);

  configure.$inject =
    ['$stateProvider', '$urlRouterProvider'];

  function configure($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('ci', {
        url: '/posts?page',
        templateUrl: 'components/post/post.html'});
      $urlRouterProvider.otherwise('/posts');
  }
})();
