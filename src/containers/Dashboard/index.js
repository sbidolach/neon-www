import React, { Component } from 'react'
import PageHeader from '../../components/utility/pageHeader'
import Box from '../../components/utility/box'
import LayoutWrapper from '../../components/utility/layoutWrapper'
import SummaryForm from './SummaryForm'
import PerformanceForm from './PerformanceForm'

export default class extends Component {
  render () {
    return (
      <LayoutWrapper>
        <PageHeader>Summary</PageHeader>
        <Box>
          <SummaryForm />
        </Box>
        <PageHeader>Performance</PageHeader>
        <Box>
          <PerformanceForm />
        </Box>
      </LayoutWrapper>
    )
  }
}
