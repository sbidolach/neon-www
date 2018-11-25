import React, { Component } from 'react'
import { Input, Col, Row } from 'antd'
import Form from '../../components/uielements/form'
import Button from '../../components/uielements/button'

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
