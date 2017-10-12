module.exports = {
  bindings: {
    signUp: '<',
  },
  controller($http, $scope) {
    this.roles = [];
    this.jobs = [];
    const eventObj = {};

    this.loadConferences = (() => {
      $http.get('/events')
        .then(response => response.data)
        .then((data) => {
          console.log('conference data is', data);
          this.events = data;
          data.forEach((event) => {
            eventObj[event.id] = { name: event.name, groupData: {} };
          });
          return this.loadGroupAndType();
        })
        .then((groupData) => {
          groupData.forEach((group) => {
            const curObj = eventObj[group.event_id].groupData;
            if (curObj[group.type]) {
              curObj[group.type].push(group.name);
            } else {
              curObj[group.type] = [group.name];
            }
          });
          console.log('eventObj is', eventObj);
          this.eventObj = eventObj;
        })
        .catch((err) => {
          console.log('conference err is', err);
        });
    })();

    this.loadGroupAndType = () => {
      const typeToGroup = {};
      return new Promise((resolve, reject) => {
        $http.get('/groups')
          .then(response => response.data)
          .then((data) => {
            resolve(data);
          })
          .catch((err) => {
            console.log('conference err is', err);
            reject(err);
          });
      });
    };

    $scope.form = {
      firstname: '',
      lastname: '',
      password: '',
      conference: '',
      role: '',
      job: '',
      email: '',
    };

    this.loadRoles = () => {
      const curConf = JSON.parse($scope.form.conference);
      const curConfId = curConf.id;
      this.roles = Object.keys(this.eventObj[curConfId].groupData);
    };

    this.loadJobs = () => {
      const curConf = JSON.parse($scope.form.conference);
      const curConfId = curConf.id;
      this.jobs = this.eventObj[curConfId].groupData[$scope.form.role];
    };

    this.handleClick = () => {
      console.log('scope form', $scope.form);
      // $scope.form.conference = JSON.parse($scope.form.conference).name;
      // $scope.form.role = JSON.parse($scope.form.role).name;
      // $scope.form.job = JSON.parse($scope.form.job).name;
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
