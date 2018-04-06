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
        url: '/',
        templateUrl: 'components/post/main.html'});
      $urlRouterProvider.otherwise('/');
  }
})();
