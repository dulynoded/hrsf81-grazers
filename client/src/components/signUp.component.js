module.exports = {
  bindings: {
    signUp: '<',
  },
  controller($http, $scope) {
    this.user = 'Test';
    this.conferences = [{ name: 'test conference', id: 1 }, { name: 'test2 conference', id: 2 }];
    this.roles = [{ name: 'volunteer', id: 1 }, { name: 'greeter', id: 2 }];

    this.loadConferences = () => {
      console.log('loading conferences');
    };

    this.loadRoles = () => {
      console.log('loading roles');
    };

    $scope.form = {
      firstname: '',
      lastname: '',
      password: '',
      conference: '',
      role: '',
      email: '',
    };
    this.handleClick = () => {
      $scope.form.conference = JSON.parse($scope.form.conference);
      // FIXME: Need to include staff/organizer role and job
      $scope.form.role = JSON.parse($scope.form.role);
      $http.post('/user', $scope.form)
        .then(response => response.data)
        .then((data) => {
          console.log('DB data is', data);
          this.signUp($scope.form);
        })
        .catch(console.error);

    };

    // this.loadUsers = () =>
    // $http({
    //   method: 'GET',
    //   url: '/users'
    // })
    // .then(response => response.data)
    // .then((users) => {
    //   this.users = users;
    // })
    // .catch(console.error);

  },
  templateUrl: 'signUp.template.html'
};
