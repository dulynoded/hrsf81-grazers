module.exports = {
  bindings: {
    signUp: '<',
  },
  controller($http) {
    this.user = 'Test';
    this.conferences = [{ name: 'test conference', id: 1 }, { name: 'test2 conference', id: 2 }];
    this.roles = [{ name: 'volunteer', id: 1 }, { name: 'greeter', id: 2 }];

    this.loadConferences = () => {
      console.log('loading conferences');
    };

    this.loadRoles = () => {
      console.log('loading roles');
    };

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
