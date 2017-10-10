function signIn($location) {
  this.user = null;

  this.getUser = () => this.user;

  this.submit = () => (
    (user) => {
      this.user = JSON.parse(user);
      $location.path(`/${this.user.role}`);
    }
  );

  this.signUpRedirect = () => (
    () => {
      $location.path('/signup');
    }
  );

  this.signUp = () =>
    (userData) => {
      console.log('in signup service!', userData);
      userData = {firstName: 'bob', role: 'organizer'};
      this.user = userData;
      $location.path(`/${this.user.role}`);
    };
}

module.exports = signIn;
