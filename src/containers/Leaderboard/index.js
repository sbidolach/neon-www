import React, { Component } from 'react'
import PageHeader from '../../components/utility/pageHeader'
import Box from '../../components/utility/box'
import LayoutWrapper from '../../components/utility/layoutWrapper'
import LeaderboardForm from './LeaderboardForm'

export default class extends Component {
  render () {
    return (
      <LayoutWrapper>
        <PageHeader>Leaderboard</PageHeader>
        <Box>
          <LeaderboardForm />
        </Box>
      </LayoutWrapper>
    )
  }
}
