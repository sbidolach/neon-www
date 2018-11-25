import React, { Component } from 'react'
import { Input, Col, Row } from 'antd'
import Form from '../../components/uielements/form'
import Button from '../../components/uielements/button'
import Notification from '../../components/notification'
import Auth from '../../helpers/auth'
import { logEvent } from '../../helpers/analytics'

const FormItem = Form.Item

function hasErrors (fieldsError) {
  return Object.keys(fieldsError).some(field => fieldsError[field])
}

class AccountForm extends Component {
  componentDidMount () {
    Auth.getUserProfile()
      .then(user => {
        const { setFields, validateFields } = this.props.form

        const fullName = user.displayName ? user.displayName.split(' ') : null
        const firstName = fullName ? fullName[0] : ''
        const lastName = fullName ? fullName[fullName.length - 1] : ''

        setFields({
          email: {value: user.email},
          firstName: {value: firstName},
          lastName: {value: lastName}
        })

        validateFields()
      })
  }
  handleSubmit = e => {
    e.preventDefault()
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        Auth.updateUserProfile(values.firstName, values.lastName)
          .then(() => {
            logEvent('account', 'update_profil')
            Notification(
              'success',
              'Your profile has updated'
            )
          })
      }
    })
  }

  render () {
    const { getFieldDecorator, getFieldsError } = this.props.form

    const rowStyle = {
      width: '100%',
      display: 'flex',
      flexFlow: 'row wrap'
    }
    const colStyle = {
      marginBottom: '16px'
    }
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        md: { span: 6 },
        sm: { span: 6 }
      },
      wrapperCol: {
        xs: { span: 24 },
        md: { span: 18 },
        sm: { span: 18 }
      }
    }
    const tailFormItemLayout = {
      wrapperCol: {
        xs: {span: 24, offset: 0},
        md: {span: 18, offset: 6},
        sm: {span: 18, offset: 6}
      }
    }
    return (
      <Form onSubmit={this.handleSubmit}>
        <Row style={rowStyle} gutter={16} justify="start">
          <Col md={12} sm={12} xs={24} style={colStyle}>
            <FormItem {...formItemLayout} label="First Name" hasFeedback>
              {getFieldDecorator('firstName', {
                rules: [{
                  required: true,
                  message: 'Please input your first name!'
                }]
              })(<Input size="large" />)}
            </FormItem>
            <FormItem {...formItemLayout} label="Last Name" hasFeedback>
              {getFieldDecorator('lastName', {
                rules: [{
                  required: true,
                  message: 'Please input your last name!'
                }]
              })(<Input size="large" />)}
            </FormItem>
            <FormItem {...tailFormItemLayout}>
              <Button type="primary" htmlType="submit" disabled={hasErrors(getFieldsError())}>Save</Button>
            </FormItem>
          </Col>
          <Col md={12} sm={12} xs={24} style={colStyle}>
            <FormItem {...formItemLayout} label="E-mail" hasFeedback>
              {getFieldDecorator('email', {
                rules: [{
                  type: 'email',
                  message: 'The input is not valid E-mail!'
                }, {
                  required: true,
                  message: 'Please input your E-mail!'
                }]
              })(<Input name="email" id="email" disabled={true} />)}
            </FormItem>
          </Col>
        </Row>
      </Form>
    )
  }
}

const WrappedAccountForm = Form.create()(AccountForm)
export default WrappedAccountForm
