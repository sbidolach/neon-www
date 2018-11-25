import React, { Component } from 'react'
import { Col, Row } from 'antd'
import Form from '../../components/uielements/form'
import Notification from '../../components/notification'
import Auth from '../../helpers/auth'
import { logEvent } from '../../helpers/analytics'
import stats2 from '../../image/hack/stats2.png'

class AccountForm extends Component {
  componentDidMount () {
  }
  handleSubmit = e => {
    e.preventDefault()
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
    return (
      <Form onSubmit={this.handleSubmit}>
        <Row style={rowStyle} gutter={16} justify="start">
          <Col md={8} sm={8} xs={24} style={colStyle}>
            <div style={{fontSize: '20px'}}>
              Amount Contributed: £250 <br/>
              Investment Return: £2.67 <br/>
              Total Return: £252.67 <br/><br/><br/>
              Personal Rate of Return: <span style={{color: 'green'}}><b>1.07%</b></span>
            </div>
          </Col>
          <Col md={16} sm={16} xs={24} style={colStyle}>
            <img src={stats2} style={{width: '100%'}} alt="" />
          </Col>
        </Row>
      </Form>
    )
  }
}

const WrappedAccountForm = Form.create()(AccountForm)
export default WrappedAccountForm
