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
        date: '@'},
      template: `
        <article class="main">
          <div class="col-10">
            <h2 class="">{{ $ctrl.type }}</h2>
            <p>{{ $ctrl.description }}</p>
              <p id="h2-date">
                <h4>{{ $ctrl.name }}
                  <span>-
                    <i class="fa fa-bookmark"></i>
                  </span>
                  {{ $ctrl.date }}
                </h4>
              </p>
              <div style="font-size:2em; color:#00a8e9">
                <i class="far fa-address-card fa-xs"></i>
                <a>{{ $ctrl.contact }}<span></span></a>
              </div>
            </div>
          </div>
        </article>
        `});
})();
