module.exports = {
  bindings: {
    user: '<',
  },
  controller($http, $scope) {
    this.$onInit = () => {
      console.log('user is', this.user);
    };

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

    this.handleClick = () => {
      // Submit event
      const obj = {
        start_date: this.startDate.toString(),
        end_date: this.endDate.toString(),
        groups: this.groups,
        organizer_id: this.user.id,
      };
      console.log('info is', obj);
    };
  },
  templateUrl: 'createEvent.template.html'
};
