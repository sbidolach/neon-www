import React, { Component } from 'react'
import PageHeader from '../../components/utility/pageHeader'
import Box from '../../components/utility/box'
import LayoutWrapper from '../../components/utility/layoutWrapper'
import AccountForm from './AccountForm'

export default class extends Component {
  render () {
    return (
      <LayoutWrapper>
        <PageHeader>Account information</PageHeader>
        <Box>
          <AccountForm />
        </Box>
      </LayoutWrapper>
    )
  }
}
