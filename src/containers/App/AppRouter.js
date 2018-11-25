import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom'
import asyncComponent from '../../helpers/AsyncFunc'

class AppRouter extends Component {
  render () {
    const { url } = this.props
    return (
      <Switch>
        <Route
          exact
          path={`${url}/`}
          component={asyncComponent(() => import('../Leaderboard'))}
        />
        <Route
          exact
          path={`${url}/account`}
          component={asyncComponent(() => import('../Account'))}
        />
        <Route
          exact
          path={`${url}/newclub`}
          component={asyncComponent(() => import('../NewClub'))}
        />
        <Route
          exact
          path={`${url}/stats`}
          component={asyncComponent(() => import('../Dashboard'))}
        />
        <Route
          exact
          path={`${url}/invest`}
          component={asyncComponent(() => import('../Invest'))}
        />
        <Route
          exact
          path={`${url}/leaderboard`}
          component={asyncComponent(() => import('../Leaderboard'))}
        />
      </Switch>
    )
  }
}

export default AppRouter
