module.exports = {
  bindings: {
    signIn: '<',
    signUp: '<',
  },
  controller($http) {
    this.user = '';

    this.loadUsers = () =>
      $http({
        method: 'GET',
        url: '/users'
      })
        .then(response => response.data)
        .then((users) => {
          this.users = users;
        })
        .catch(console.error);
  },
  templateUrl: 'signIn.template.html'
};
