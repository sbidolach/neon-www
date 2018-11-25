import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Input from '../../components/uielements/input'
import Button from '../../components/uielements/button'
import IntlMessages from '../../components/utility/intlMessages'
import ForgotPasswordStyleWrapper from './forgotPassword.style'
import Auth from '../../helpers/auth'
import { notification } from '../../components/index'
import { logEvent, logException } from '../../helpers/analytics'

export default class extends Component {
  state = {
    email: ''
  };
  resetPassword = () => {
    const { email } = this.state
    if (!email) {
      const message = 'Please fill in email.'
      logException(message)
      notification('error', message)
      return
    }
    Auth.resetPassword(email)
      .then(() => {
        logEvent('forgotpassword', 'email sent')
        notification('success', `Password reset email sent to ${email}.`)
      })
      .catch(error => {
        const message = 'Email address not found.'
        logException(message)
        notification('error', message)
      })
  }
  render () {
    return (
      <ForgotPasswordStyleWrapper className="isoForgotPassPage">
        <div className="isoFormContentWrapper">
          <div className="isoFormContent">
            <div className="isoLogoWrapper">
              <Link to="/dashboard">
                <img src={require('../../image/neon_logo.png')} alt="Feebuster"/>
              </Link>
            </div>

            <div className="isoFormHeadText">
              <h3>
                <IntlMessages id="page.forgetPassSubTitle" />
              </h3>
              <p>
                <IntlMessages id="page.forgetPassDescription" />
              </p>
            </div>

            <div className="isoForgotPassForm">
              <div className="isoInputWrapper">
                <Input
                  ref={email => (this.email = email)}
                  size="large"
                  placeholder="Email"
                  value={this.state.email}
                  onChange={event => {
                    this.setState({ email: event.target.value })
                  }} />
              </div>

              <div className="isoInputWrapper">
                <Button type="primary" onClick={this.resetPassword}>
                  <IntlMessages id="page.sendRequest" />
                </Button>
              </div>

            </div>
          </div>
        </div>
      </ForgotPasswordStyleWrapper>
    )
  }
}
