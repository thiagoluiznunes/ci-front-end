'use strict';

(function() {
  angular
    .module('ci-app')
    .component('post', {
      bindings: {
        type: '@',
        description: '@',
        name: '@',
        contact: '@',
        data: '@'},
      template: `
        <article>
          <div class="col-10">
            <h2>{{ $ctrl.type }}</h2>
            <p>{{ $ctrl.description }}</p>
            <a href="{{ $ctrl.contact }}">{{ $ctrl.name }}</a>
            <i class="fa fa-bookmark">
              {{ $ctrl.data }}
            </i>
          </div>
        </article>
      `
    });
})();