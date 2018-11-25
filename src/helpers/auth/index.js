class AuthHelper {
  EMAIL = 'email';
  FACEBOOK = 'facebook';
  GOOGLE = 'google';

  constructor () {
    this.login = this.login.bind(this)
    this.logout = this.logout.bind(this)
    this.isAuthenticated = this.isAuthenticated.bind(this)
    this.createUserWithEmailAndPassword = this.createUserWithEmailAndPassword.bind(this)
    this.getUserProfile = this.getUserProfile.bind(this)
    this.resetPassword = this.resetPassword.bind(this)
    this.updateUserProfile = this.updateUserProfile.bind(this)
    this.sendEmailVerification = this.sendEmailVerification.bind(this)
  }
  createUserWithEmailAndPassword (email, password) {
    return;
  }
  login (provider, info) {
    return;
  }
  logout () {
    return;
  }
  isAuthenticated () {
    return;
  }
  getUserProfile () {
    return;
  }
  resetPassword (email) {
    return;
  }
  updateUserProfile (firstName, lastName) {
    return;
  }
  sendEmailVerification () {
    return;
  }
  getIdToken () {
    return;
  }
}

export default new AuthHelper()
