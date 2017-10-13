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
    this.roles = [];
    this.groups = [];

    $scope.form = {
      name: '',
      role: '',
      group: '',
    };

    this.addGroup = () => {
      this.groups.push($scope.form.group);
      $scope.form.group = '';
    };

    this.addRole = () => {
      this.roles.push($scope.form.role);
      $scope.form.role = '';
    };

    this.handleClick = () => {
      // Submit event
      const obj = {
        start_date: this.startDate.toString(),
        end_date: this.endDate.toString(),
        roles: this.roles,
        groups: this.groups,
        organizer_id: this.user.id,
      };
      console.log('info is', obj);
    };
  },
  templateUrl: 'createEvent.template.html'
};
