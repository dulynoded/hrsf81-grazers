module.exports = {
  bindings: {
    user: '<',
    redirect: '<',
  },
  controller($http, $scope) {
    this.$onInit = () => {
      console.log('user is', this.user);
    };
    console.log('IN CONTROLLER FOR CREATE');

    this.startDate = new Date();
    this.endDate = new Date();
    this.groups = [];

    $scope.form = {
      name: '',
      group: '',
    };

    // Add groups to staff role
    this.addGroup = () => {
      this.groups.push($scope.form.group);
      $scope.form.group = '';
    };

    this.handleEventClick = () => {
      // Submit event
      const obj = {
        start_date: this.startDate.toString(),
        end_date: this.endDate.toString(),
        groups: this.groups,
        organizer_id: this.user.id,
        name: $scope.form.name,
      };
      console.log('info is', obj);

      $http.post('/event', obj)
        .then(response => response.data)
        .then((data) => {
          this.user.conference = data.name;
          this.user.conferenceId = data.event_id;
          this.redirect(this.user);
        })
        .catch((err) => {
          console.log('err in event is', err);
        });
    };
  },
  templateUrl: 'createEvent.template.html'
};
