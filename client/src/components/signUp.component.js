module.exports = {
  bindings: {
    signUp: '<',
  },
  controller($http, $scope) {
    this.user = 'Test';
    this.conferences = [{ name: 'test conference', id: 1 }, { name: 'test2 conference', id: 2 }];
    this.roles = [{ name: 'organizer', id: 1 }, { name: 'staff', id: 2 }];
    this.jobs = [{ name: 'volunteers', id: 1 }, { name: 'greeters', id: 2 }];

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
      $scope.form.conference = JSON.parse($scope.form.conference).name;
      $scope.form.role = JSON.parse($scope.form.role).name;
      $scope.form.job = JSON.parse($scope.form.job).name;
      $http.post('/user', $scope.form)
        .then(response => response.data)
        .then((data) => {
          const userData = Object.assign(
            {},
            $scope.form,
            { id: data.userId, group_id: data.groupId }
          );
          this.signUp(userData);
        })
        .catch((err) => {
          // TODO: This email is already taken, try again.
          console.log('err is', err);
        });
    };
  },
  templateUrl: 'signUp.template.html'
};
