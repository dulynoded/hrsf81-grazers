module.exports = {
  bindings: {
    signIn: '<',
    signUp: '<',
  },
  controller($http, $scope) {
    this.user = '';
    $scope.form = {
      password: '',
      email: '',
    };

    this.error = false;

    this.handleClick = () => {
      const { password } = $scope.form;
      const { email } = $scope.form;
      console.log('params are', password, email);
      $http.get('/user/login', { params: { email, password } })
        .then(response => response.data)
        .then((resp) => {
          this.signIn(resp, false);
        })
        .catch((err) => {
          console.log('err is', err);
          if (err.data.user === false) {
            if (!err.data.info.exists) {
              this.signIn(null, true);
            } else {
              this.error = true;
            }
          }
        });
    };
  },
  templateUrl: 'signIn.template.html'
};
