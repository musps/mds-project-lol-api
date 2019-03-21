import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom'
import { withRouter } from 'react-router'
import { connect } from 'react-redux'

import MenuContainer from './Menu'

import { championGetList } from '@store/champion/requests'
import { championSetList } from '@store/champion/actions'

import HomePage from '@pages/Home'
import SummonerPage from '@pages/Summoner'
import PageNotFound from '@pages/PageNotFound'

class RootContainer extends Component {
  constructor(props) {
    super(props)
    this.init = this.init.bind(this)
  }

  componentWillMount() {
    this.init()
  }

  showHomePage = () => this.props.location.pathname !== '/'

  init() {
    championGetList()
      .then(data => championSetList(data))
      .catch(() => championSetList([]))
  }

  render() {
    return (
      <div className="app">
        <MenuContainer />

        {this.showHomePage() && (
          <HomePage size="min" />
        )}

        <Switch>
          <Route path="/" exact component={HomePage} />
          <Route path="/summoner/:summonerName" component={SummonerPage} />
          <Route path="*" component={PageNotFound} />
        </Switch>
      </div>
    )
  }
}

export default connect(state => state)(withRouter(RootContainer))
