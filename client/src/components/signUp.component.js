module.exports = {
  bindings: {
    signUp: '<',
  },
  controller($http) {
    this.user = 'Test';

    // this.loadUsers = () =>
    //   $http({
    //     method: 'GET',
    //     url: '/users'
    //   })
    //     .then(response => response.data)
    //     .then((users) => {
    //       this.users = users;
    //     })
    //     .catch(console.error);
  },
  templateUrl: 'signUp.template.html'
};
