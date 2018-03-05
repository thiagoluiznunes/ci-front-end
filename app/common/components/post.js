'use strict';

(function() {
  angular
    .module('ci-app')
    .component('ciPost', {
      bindings: {
        type: '@',
        description: '@',
        name: '@',
        contact: '@',
        data: '@'},
      template: `
        <article class="main">
          <div class="col-10">
            <h2 class="">{{ $ctrl.type }}</h2>
            <p>{{ $ctrl.description }}</p>
            <p id="h2-data">
              <a href="{{ $ctrl.contact }}">{{ $ctrl.name }}<span>-</span></a>
              <i class="fa fa-bookmark"></i>
                {{ $ctrl.data }}
            </p>
          </div>
        </article>
        `});
})();
