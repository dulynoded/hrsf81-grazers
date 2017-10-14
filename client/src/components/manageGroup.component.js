module.exports = {
  bindings: {
    groupId: '<'
  },
  controller(groups, $scope, $http) {
    this.signUpUrl = true;
    this.url = 'http://localhost:3000/signup?group_id=4&event_id=2';

    this.$onChanges = (changesObj) => {
      if (changesObj.groupId.currentValue) {
        groups.getMembers(this.groupId)
          .then((groupsData) => {
            this.members = groupsData;
          })
          .catch(console.error);
      }
    };
    this.clearInputs = () => {
      this.firstname = '';
      this.lastname = '';
      this.email = '';
      this.phone = '';
    };
    this.addUser = () => {
      this.signUpUrl = false;

      const postData = {
        role: 'attendee',
        firstname: this.firstname,
        lastname: this.lastname,
        email: this.email,
        phone: this.phone,
      };

      $http.post('/attendee', postData)
        .then((results) => {
          console.log('results', results);
        })
        .catch((err) => {
          throw err;
        });
    };
    this.clearInputs();
  },
  templateUrl: 'manageGroup.template.html'
};
