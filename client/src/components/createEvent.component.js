module.exports = {
  bindings: {
    user: '<',
    redirect: '<',
  },

  controller($http, $scope) {
    this.startDate = new Date();
    this.endDate = new Date();
    this.groups = [];

    $scope.form = {
      name: '',
      group: '',
      location: '',
    };

    this.addGroup = () => {
      this.groups.push($scope.form.group);
      $scope.form.group = '';
    };

    this.loadEndDate = () => {
      this.endDate = this.startDate;
    };

    this.handleEventClick = () => {
      const obj = {
        start_date: this.startDate.toString(),
        end_date: this.endDate.toString(),
        location: $scope.form.location,
        groups: this.groups,
        organizer_id: this.user.id,
        name: $scope.form.name,
      };

      $http.post('/event', obj)
        .then(response => response.data)
        .then((data) => {
          // TODO: conference and conferenceId can probably be deleted
          this.user.conference = data.name;
          this.user.conferenceId = data.event_id;
          this.user.event = data.name;
          this.user.event_id = data.event_id;
          this.redirect(this.user);
        })
        .catch((err) => {
          throw err;
        });
    };
  },
  templateUrl: 'createEvent.template.html'
};
