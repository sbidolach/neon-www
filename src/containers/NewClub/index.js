import React, { Component } from 'react'
import PageHeader from '../../components/utility/pageHeader'
import Box from '../../components/utility/box'
import LayoutWrapper from '../../components/utility/layoutWrapper'
import NewClubForm from './NewClubForm'
import InviteFriendForm from './InviteFriendForm'
import Button from '../../components/uielements/button'
import BankApi from '../../helpers/api/bank'

export default class extends Component {
  render () {
    return (
      <LayoutWrapper>
        <PageHeader>Create New Club</PageHeader>
        <Box>
          <NewClubForm />
        </Box>
        <PageHeader>Invite friends to join club</PageHeader>
        <Box>
          <InviteFriendForm />
        </Box>
        <Button type="primary" htmlType="submit" onClick={() => {BankApi.createClub()}} style={{width: '100%', height: '60px', backgroundColor: 'green'}}>Start Investing Club</Button>
      </LayoutWrapper>
    )
  }
}
