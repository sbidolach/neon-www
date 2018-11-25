import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import Input from '../../components/uielements/input'
import Checkbox from '../../components/uielements/checkbox'
import Button from '../../components/uielements/button'
import authAction from '../../redux/auth/actions'
import Auth from '../../helpers/auth'
import IntlMessages from '../../components/utility/intlMessages'
import SignUpStyleWrapper from './signup.style'
import { notification } from '../../components/index'
import { logEvent, logException } from '../../helpers/analytics'

const { login } = authAction

class SignUp extends Component {
  state = {
    redirectToReferrer: false,
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    passwordConfirm: '',
    signUpTerms: false
  };
  componentWillReceiveProps (nextProps) {
    if (this.props.isLoggedIn !== nextProps.isLoggedIn && nextProps.isLoggedIn === true) {
      this.setState({ redirectToReferrer: true })
    }
  }
  handleSignUp = () => {
    const { firstName, lastName, email, password, passwordConfirm, signUpTerms } = this.state

    if (!(firstName && lastName && email && password && passwordConfirm)) {
      const message = 'Please fill registration form'
      logException(message)
      notification('error', message)
      return
    }
    if (password !== passwordConfirm) {
      const message = 'Two passwords that you enter are inconsistent!'
      logException(message)
      notification('error', message)
      return
    }
    if (!signUpTerms) {
      const message = 'Please accept terms and conditions'
      logException(message)
      notification('error', 'Please accept terms and conditions')
      return
    }

    let isError = false
    Auth.createUserWithEmailAndPassword(email, password)
      .catch(result => {
        const message =
          result && result.message ? result.message : 'Sorry Some error occurs'
        logException(message)
        notification('error', message)
        isError = true
      })
      .then(result => {
        if (isError) {
          return
        }
        if (!result || result.message) {
          const message =
            result && result.message
              ? result.message
              : 'Sorry Some error occurs'
          logException(message)
          notification('error', message)
        } else {
          Auth.updateUserProfile(firstName, lastName)
            .then(() => {
              Auth.sendEmailVerification()
                .then(() => {
                  logEvent('signup', 'register_success')
                  this.props.login()
                })
            })
        }
      })
  }
  render () {
    return (
      <SignUpStyleWrapper className="isoSignUpPage">
        <div className="isoSignUpContentWrapper">
          <div className="isoSignUpContent">
            <div className="isoLogoWrapper">
              <Link to="/dashboard">
                <img src={require('../../image/neon_logo.png')} alt="Feebuster"/>
              </Link>
            </div>

            <div className="isoSignUpForm">
              <div className="isoInputWrapper isoLeftRightComponent">
                <Input
                  size="large"
                  placeholder="First name"
                  value={this.state.firstName}
                  onChange={event => {
                    this.setState({ firstName: event.target.value })
                  }} />
                <Input
                  size="large"
                  placeholder="Last name"
                  value={this.state.lastName}
                  onChange={event => {
                    this.setState({ lastName: event.target.value })
                  }} />
              </div>
              <div className="isoInputWrapper">
                <Input
                  size="large"
                  placeholder="Email"
                  ref={email => (this.email = email)}
                  value={this.state.email}
                  onChange={event => {
                    this.setState({ email: event.target.value })
                  }} />
              </div>
              <div className="isoInputWrapper">
                <Input
                  size="large"
                  type="password"
                  placeholder="Password"
                  value={this.state.password}
                  onChange={event => {
                    this.setState({ password: event.target.value })
                  }} />
              </div>
              <div className="isoInputWrapper">
                <Input
                  size="large"
                  type="password"
                  placeholder="Confirm Password"
                  value={this.state.passwordConfirm}
                  onChange={event => {
                    this.setState({ passwordConfirm: event.target.value })
                  }} />
              </div>
              <div className="isoInputWrapper" style={{ marginBottom: '50px' }}>
                <Checkbox
                  checked={this.state.signUpTerms}
                  onChange={event => {
                    this.setState({ signUpTerms: event.target.checked })
                  }} >
                  <IntlMessages id="page.signUpTermsConditions" />
                  <a href="https://feebuster.co/policies" target="_blank" rel="noopener noreferrer">terms and conditions</a>
                </Checkbox>
              </div>
              <div className="isoInputWrapper">
                <Button type="primary" onClick={this.handleSignUp}>
                  <IntlMessages id="page.signUpButton" />
                </Button>
              </div>
              <div className="isoInputWrapper isoCenterComponent isoHelperWrapper">
                <Link to="/signin">
                  <IntlMessages id="page.signUpAlreadyAccount" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </SignUpStyleWrapper>
    )
  }
}

export default connect(
  state => ({
    isLoggedIn: state.Auth.get('idToken') !== null ? true : false
  }),
  { login }
)(SignUp)
