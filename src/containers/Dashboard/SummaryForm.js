import React, { Component } from 'react'
import { Col, Row } from 'antd'
import Form from '../../components/uielements/form'
import Button from '../../components/uielements/button'
import { createColumns } from './config'
import stats1 from '../../image/hack/stats1.png'

const FormItem = Form.Item

class AccountForm extends Component {
  constructor (props) {
    super(props)
    this.columns = createColumns()
    this.onClick = this.onClick.bind(this)
  }
  componentDidMount () {

  }
  handleSubmit = e => {
    e.preventDefault()
  }

  onClick () {
    window.location = '/dashboard/leaderboard'
  }

  render () {

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
      <div>
        <Row style={rowStyle} gutter={16} justify="start">
          <Col md={20} sm={20} xs={24} style={colStyle}>
            &nbsp;
          </Col>
          <Col md={4} sm={4} xs={24} style={colStyle}>
            <FormItem {...formItemLayout}>
              <Button type="primary" onClick={() => {this.onClick()}}>View Leaderboard</Button>
            </FormItem>
          </Col>
        </Row>
        <Row>
          <img src={stats1} style={{width: '100%'}} alt="" />
        </Row>
      </div>
    )
  }
}

const WrappedAccountForm = Form.create()(AccountForm)
export default WrappedAccountForm
