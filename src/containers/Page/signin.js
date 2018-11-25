import React, { Component } from 'react'
import { Link, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import Input from '../../components/uielements/input'
import Checkbox from '../../components/uielements/checkbox'
import Button from '../../components/uielements/button'
import authAction from '../../redux/auth/actions'
import Auth from '../../helpers/auth'
import IntlMessages from '../../components/utility/intlMessages'
import SignInStyleWrapper from './signin.style'
import { notification } from '../../components/index'

const { login } = authAction

class SignIn extends Component {
  state = {
    redirectToReferrer: false,
    email: '',
    password: ''
  };
  componentWillReceiveProps (nextProps) {
    if (this.props.isLoggedIn !== nextProps.isLoggedIn && nextProps.isLoggedIn === true) {
      this.setState({ redirectToReferrer: true })
    }
  }
  handleLogin = (provider) => {
    if (Auth.EMAIL === provider) {
      const { email, password } = this.state
      if (!(email && password)) {
        const message = 'Please fill in email. and password'
        notification('error', message)
        return
      }
    }
    this.props.login()
  }
  render () {
    const from = { pathname: '/dashboard' }
    const { redirectToReferrer } = this.state

    if (redirectToReferrer) {
      return <Redirect to={from} />
    }
    return (
      <SignInStyleWrapper className="isoSignInPage">
        <div className="isoLoginContentWrapper">
          <div className="isoLoginContent">
            <div className="isoLogoWrapper">
              <Link to="/dashboard">
                <img src={require('../../image/sign-neon-logo.png')} alt="Neon"/>
              </Link>
            </div>

            <div className="isoSignInForm">

              <div className="isoCenterComponent" style={{paddingBottom: '30px'}}>
                <Link to="/signup">
                  Create Neon account
                </Link>
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

              <div className="isoInputWrapper isoLeftRightComponent">
                <Checkbox>
                  <IntlMessages id="page.signInRememberMe" />
                </Checkbox>
                <Button type="primary" onClick={event => this.handleLogin(Auth.EMAIL)}>
                  <IntlMessages id="page.signInButton" />
                </Button>
              </div>

              <div className="isoCenterComponent isoHelperWrapper">
                <Link to="/forgotpassword" className="isoForgotPass">
                  <IntlMessages id="page.signInForgotPass" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </SignInStyleWrapper>
    )
  }
}

export default connect(
  state => ({
    isLoggedIn: state.Auth.get('idToken') !== null ? true : false
  }),
  { login }
)(SignIn)
