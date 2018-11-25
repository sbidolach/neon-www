import React, { Component } from 'react'
import { Input, Col, Row } from 'antd'
import Form from '../../components/uielements/form'
import Button from '../../components/uielements/button'
import SimpleTable from '../Tables/antTables/tableViews/simpleView'
import { createColumns } from './config'

const FormItem = Form.Item

const friendsData = [{
  'email': 'john@gmail.com',
  'name': 'John',
  'surname': 'Doe'
},{
  'email': 'john@gmail.com',
  'name': 'John',
  'surname': 'Doe'
},{
  'email': 'john@gmail.com',
  'name': 'John',
  'surname': 'Doe'
}]

function hasErrors (fieldsError) {
  return Object.keys(fieldsError).some(field => fieldsError[field])
}

class AccountForm extends Component {
  constructor (props) {
    super(props)
    this.columns = createColumns()
  }
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

    return (
      <Form onSubmit={this.handleSubmit}>
        <Row style={rowStyle} gutter={16} justify="start">
          <Col md={12} sm={12} xs={24} style={colStyle}>
            <FormItem {...formItemLayout} label="Enter friend's email" hasFeedback>
              {getFieldDecorator('clubName', {
                rules: [{
                  required: true,
                  message: 'Please input your email!'
                }]
              })(<Input size="large" />)}
            </FormItem>
          </Col>
          <Col md={12} sm={12} xs={24} style={colStyle}>
            <FormItem {...formItemLayout}>
              <Button type="primary" htmlType="submit" disabled={hasErrors(getFieldsError())}>Invite</Button>
            </FormItem>
          </Col>
        </Row>
        <Row>
          <SimpleTable columns={this.columns} dataSource={friendsData} />
        </Row>
      </Form>
    )
  }
}

const WrappedAccountForm = Form.create()(AccountForm)
export default WrappedAccountForm
