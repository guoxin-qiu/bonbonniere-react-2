const fakeAuth = {
  isAuthenticated: false,
  authenticate(cb) {
    this.isAuthenticated = true;
    setTimeout(cb, 2000);
  },
  signout(cb) {
    this.isAuthenticated = false;
    setTimeout(cb, 2000);
  }
};

export default fakeAuth;
