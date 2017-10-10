function signIn($location) {
  this.user = null;

  this.getUser = () => this.user;

  this.submit = () => (
    (user) => {
      this.user = JSON.parse(user);
      $location.path(`/${this.user.role}`);
      console.log('redirecting');
      // $location.path('/signup');
    }
  );

  this.signUp = () =>
    (userData) => {
      console.log('in signup!', userData);
      this.user = JSON.parse(userData);
      $location.path('/organizer');
    };
}

module.exports = signIn;
