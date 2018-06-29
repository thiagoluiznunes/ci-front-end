'use strict';

(function() {
  angular
    .module('ci-app')
    .controller('PostCtrl', PostController);

  PostController.$inject = ['$interval', 'postFactory',
                            'msgs', 'checkFactory', 'loginFactory'];

  function PostController(...injections) {
    const vm = this;
    initVariables(vm);

    vm.getUser = () => injections[4].getUser();

    vm.cancel = () => cancel(vm);

    vm.confirm = () => confirm(vm);

    vm.addPost = () => addPost(vm);

    vm.clearCheck = () => injections[3].clearCheck(vm.found, vm.lost, vm.post);

    vm.checkBoxLost = () => checkBoxLost(vm, injections[3]);

    vm.checkBoxFound = () => checkBoxFound(vm, injections[3]);

    vm.refresh = () => refresh(vm, injections[1], injections[2]);

    vm.create = () => create(vm, injections[1], injections[2]);

    vm.refresh();

    timeOut(vm, injections[0]);
  }

  function initVariables(vm) {
    vm.posts = {};
    vm.post = {};
    vm.found = {status: false, name: 'found'};
    vm.lost = {status: false, name: 'lost'};
    vm.checkConfirm = false;
  }

  function create(vm, postFactory, msgs) {
    postFactory.post(vm.post, (err, response) => {
      if (response) {
        msgs.addSuccess('Item postado! :D');
        vm.cancel();
        vm.refresh();
      } else {
        msgs.addError(err);
      }
      vm.checkConfirm = false;
    });
  }

  function refresh(vm, postFactory, msgs) {
    postFactory.get((err, response) => {
      if (response) vm.posts = response;
      else msgs.addError(err);
    });
  }

  function checkBoxLost(vm, checkFactory) {
    checkFactory.checkBox(vm, 'lost', 'found');
  }

  function checkBoxFound(vm, checkFactory) {
    checkFactory.checkBox(vm, 'found', 'lost');
  }

  function cancel(vm) {
    vm.post = {};
    vm.clearCheck();
  }

  function addPost(vm) {
    vm.clearCheck();
    $('#postModal').modal('show');
  }

  function confirm(vm) {
    vm.checkConfirm = true;
    vm.create();
  }

  function timeOut(vm, interval) {
    interval(() => {
      vm.refresh();
    }, 50000);
  }
})();
