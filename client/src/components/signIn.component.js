module.exports = {
  bindings: {
    signIn: '<',
    signUp: '<',
  },
  controller($http, $scope) {
    this.user = '';
    $scope.form = {
      password: '',
    }

    this.error = false;

    this.handleClick = () => {
      const user = JSON.parse(this.user);
      const { password } = $scope.form;
      $http.get('/user/login', { params: { email: user.email, password } })
        .then(response => response.data)
        .then((resp) => {
          console.log('response is', resp);
          this.signin(user, false);
        })
        .catch((err) => {
          if (err.data === false) {
            this.error = true;
          }
          console.log('login err', err);
        });

      // this.signIn(JSON.parse(this.user), $scope.form.password);
    };

    this.loadUsers = () =>
      $http({
        method: 'GET',
        url: '/users'
      })
        .then(response => response.data)
        .then((users) => {
          this.users = users;
        })
        .catch(console.error);
  },
  templateUrl: 'signIn.template.html'
};
