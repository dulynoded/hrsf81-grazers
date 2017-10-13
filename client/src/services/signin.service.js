function signIn($location) {
  this.user = null;

  this.getUser = () => {
    console.log('getting user');
    return this.user;
  };

  this.submit = () => (
    (user, signupRedirect) => {
      if (signupRedirect) {
        $location.path('/signup');
      } else {
        this.user = user;
        $location.path(`/${this.user.role}`);
      }
    }
  );

  this.signUpRedirect = () => (
    () => {
      $location.path('/signup');
    }
  );

  this.createEventRedirect = () => (
    (user) => {
      console.log('in event redirect', user);
      this.user = user;
      $location.path('/organizer');
    }
  );

  this.signUp = () =>
    (userData) => {
      this.user = userData;
      console.log('in signup', userData);
      if (this.user.role !== 'organizer') {
        $location.path(`/${this.user.role}`);
      } else {
        console.log('directing to create');
        $location.path('/create');
      }
    };
}

module.exports = signIn;
