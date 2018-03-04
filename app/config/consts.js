'use strict';

(function() {
  angular
    .module('ci-app')
    .constant('consts', {
      appName: 'CI Achados e Perdidos',
      version: '1.0',
      owner: 'Thiago Luiz',
      year: '2018',
      site: 'https://github.com/ThiagoLuizNunes',
      oapiUrl: 'https://ci-back-end.herokuapp.com/api',
      // oapiUrl: 'http://localhost:4000/api',
      userKey: '_ci-achados-perdidos_'})
    .run(['$rootScope', 'consts', runConsts]);

  function runConsts($rootScope, consts) {
    $rootScope.consts = consts;
  }
})();
