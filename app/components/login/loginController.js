'use strict';

(function() {
  angular
    .module('ci-app')
    .controller('LoginCtrl', LoginController)
    .run(LoginRunBlock);

  LoginController.$inject =
    ['$http', '$location', 'loginFactory', 'msgs', 'consts'];
  LoginRunBlock.$inject =
    ['$rootScope', '$location', '$window', '$state', 'loginFactory'];

  function LoginController(...injections) {
    const vm = this;

    vm.validateUser = injections[2].validateUser;

    vm.getUser = () => injections[2].getUser();

    vm.login = () => {
      injections[2].login(vm.user, (err, response) => {
        if (err) return injections[4].addError(err.errors);
        injections[2].closeModal();
        injections[3].addSuccess('Login realizado com sucesso!');
      });
    };

    vm.signup = () => {
      injections[2].signup(vm.user, (err, response) => {
        if (err) return injections[4].addError(err.errors);
        vm.login();
      });
    };

    vm.logout = () => {
      injections[2].logout();
    };


    vm.showModal = () => injections[2].showModal();
  }

  function LoginRunBlock(...injections) {
    let user = injections[4].getUser();

    // injections[4].validateToken(user.userToken, (err, response) => {
    //   if (err) {
    //     console.log(err);
    //   } else {
    //     console.log(response);
    //   }
    // });
  }
})();
