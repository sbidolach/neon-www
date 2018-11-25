import React, { Component } from 'react'
import { Col, Row } from 'antd'
import Form from '../../components/uielements/form'
import SimpleTable from '../Tables/antTables/tableViews/simpleView'
import { createColumns } from './config'
import image1 from '../../image/hack/fund_1.png'
import option1 from '../../image/hack/fund_o_1.png'
import image2 from '../../image/hack/fund_2.png'
import option2 from '../../image/hack/fund_o_2.png'
import image3 from '../../image/hack/fund_3.png'
import option3 from '../../image/hack/fund_o_3.png'
import image4 from '../../image/hack/fund_4.png'
import option4 from '../../image/hack/fund_o_4.png'
import image5 from '../../image/hack/fund_5.png'
import option5 from '../../image/hack/fund_o_5.png'

const friendsData = [{
  'fund': image1,
  'option': option1,
  'surname': 'Doe'
}, {
  'fund': image2,
  'option': option2,
  'surname': 'Doe'
}, {
  'fund': image3,
  'option': option3,
  'surname': 'Doe'
}, {
  'fund': image4,
  'option': option4,
  'surname': 'Doe'
}, {
  'fund': image5,
  'option': option5,
  'surname': 'Doe'
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
            <span style={{fontSize: '30px'}}>Total Amount available to invest £400</span>
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
