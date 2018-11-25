import React, { Component } from 'react'
import { Input, Col, Row } from 'antd'
import Form from '../../components/uielements/form'
import Notification from '../../components/notification'
import Auth from '../../helpers/auth'
import { logEvent } from '../../helpers/analytics'

const FormItem = Form.Item

function hasErrors (fieldsError) {
  return Object.keys(fieldsError).some(field => fieldsError[field])
}

class AccountForm extends Component {
  componentDidMount () {
  }
  handleSubmit = e => {
    e.preventDefault()
  }

  render () {
    const { getFieldDecorator } = this.props.form

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
    return (
      <Form onSubmit={this.handleSubmit}>
        <Row style={rowStyle} gutter={16} justify="start">
          <Col md={12} sm={12} xs={24} style={colStyle}>
            <FormItem {...formItemLayout} label="Select fund" hasFeedback>
              {getFieldDecorator('clubName', {
                rules: [{
                  required: true,
                  message: 'Please input your club name!'
                }]
              })(<Input size="large" />)}
            </FormItem>
          </Col>
          <Col md={12} sm={12} xs={24} style={colStyle}>
            <FormItem {...formItemLayout} label="Investment amount" hasFeedback>
              {getFieldDecorator('amount', {
                rules: [{
                  required: true,
                  message: 'Please input your amount!'
                }]
              })(<Input size="large" />)}
            </FormItem>
          </Col>
        </Row>
      </Form>
    )
  }
}

const WrappedAccountForm = Form.create()(AccountForm)
export default WrappedAccountForm
