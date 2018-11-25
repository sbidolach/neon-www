import React, { Component } from 'react'
import { Col, Row } from 'antd'
import Form from '../../components/uielements/form'
import SimpleTable from '../Tables/antTables/tableViews/simpleView'
import { createColumns } from './config'

import group1 from '../../image/hack/group1.png'
import group2 from '../../image/hack/group2.png'
import group3 from '../../image/hack/group3.png'
import group4 from '../../image/hack/group4.png'

import p1 from '../../image/hack/p1.png'
import p2 from '../../image/hack/p2.png'
import p3 from '../../image/hack/p3.png'
import p4 from '../../image/hack/p4.png'

const friendsData = [{
  'name': 'Time2Save',
  'image': group1,
  'amount': '£100',
  'frequency': 'Weekly',
  'performance': p1
}, {
  'name': 'TopTrumps',
  'image': group2,
  'amount': '£250',
  'frequency': 'Monthly',
  'performance': p2
}, {
  'name': 'GenerationRent',
  'image': group3,
  'amount': '£70',
  'frequency': 'Bi-Weekly',
  'performance': p3
}, {
  'name': 'BrokeInThecity',
  'image': group4,
  'amount': '£25',
  'frequency': 'Monthly',
  'performance': p4
}]

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
          <Col md={24} sm={24} xs={24} style={colStyle}>
            <span style={{fontSize: '25px'}}>View other investment clubs and ask to join</span>
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
