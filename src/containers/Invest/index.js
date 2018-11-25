import React, { Component } from 'react'
import PageHeader from '../../components/utility/pageHeader'
import Box from '../../components/utility/box'
import LayoutWrapper from '../../components/utility/layoutWrapper'
import InvestListForm from './InvestListForm'
import PurchaseForm from './PurchaseForm'
import Button from '../../components/uielements/button'

export default class extends Component {
  render () {
    return (
      <LayoutWrapper>
        <PageHeader>Invest</PageHeader>
        <Box>
          <InvestListForm />
        </Box>
        <PageHeader>Purchase</PageHeader>
        <Box>
          <PurchaseForm />
        </Box>
        <Button type="primary" htmlType="submit" onClick={() => {window.location = '/dashboard/stats'}} style={{width: '100%', height: '60px', backgroundColor: 'green'}}>Start Investing</Button>
      </LayoutWrapper>
    )
  }
}
