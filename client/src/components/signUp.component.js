module.exports = {
  bindings: {
    signUp: '<',
  },
  controller($http, $scope) {
    this.roles = [];
    this.jobs = [];

    this.loadConferences = (() => {
      $http.get('/events')
        .then(response => response.data)
        .then((data) => {
          // console.log('conference data is', data);
          this.conferences = data;
          this.loadGroupAndType();
        })
        .catch((err) => {
          console.log('conference err is', err);
        });
    })();

    this.loadGroupAndType = () => {
      const typeToGroup = {};
      $http.get('/groups')
        .then(response => response.data)
        .then((data) => {
          console.log('group data is', data);
          data.forEach((group) => {
            if (typeToGroup[group.type]) {
              typeToGroup[group.type].push(group.name);
            } else {
              typeToGroup[group.type] = [group.name];
            }
          });
          console.log('typeToGroup is', typeToGroup);
          this.roles = Object.keys(typeToGroup);
          this.jobs = typeToGroup;
        })
        .catch((err) => {
          console.log('conference err is', err);
        });
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
