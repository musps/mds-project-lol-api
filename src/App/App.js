import React, { Component, Fragment } from 'react'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'
import { Dropdown, Menu, Icon, Input, Button, List, Image, Modal } from 'semantic-ui-react'
import { withRouter } from 'react-router'
import { Provider } from 'react-redux'

import rootStore from '../store/rootStore'

import 'semantic-ui-css/semantic.min.css'
import './App.scss'

import HomePage from '../pages/Home'
import SummonerPage from '../pages/Summoner'
import PageNotFound from '../pages/PageNotFound'

import { championGetList } from '../store/champion/requests'
import { championSetList } from '../store/champion/actions'

import store from '../store/rootStore'
import { historyRemoveName } from '../store/history/actions'
import SearchHistoryComponent from '../components/SearchHistory'
import { connect } from 'react-redux'
import { historyReset } from '../store/history/actions'

const resetHistory = () => store.dispatch(historyReset())

class App extends Component {
  render() {
    return (
      <Provider store={rootStore}>
        <Router>
          <Root />
        </Router>
      </Provider>
    )
  }
}

const MenuTop = ({ showBackButton = false, history, onClickShowHistory }) => (
  <Menu className="menuTop">
    {showBackButton &&
      <Fragment>
        <Menu.Item
          className='btnGoBack'
          name='goback'
          onClick={() => history.goBack()}
        >
          <Icon name='arrow left' />
        </Menu.Item>

        <Menu.Item
          name='home'
          content='Home'
          onClick={() => history.push('/')}
        />

        <Menu.Item
          name='recentsearch'
          content='Recent search'
          onClick={onClickShowHistory}
        />
      </Fragment>
    }

    <Menu.Item
      name='goback'
      position='right'
      className='btnGoBack'
    >
      <Dropdown item icon='ellipsis vertical' position='right' direction='left'>
        <Dropdown.Menu>
          <Dropdown.Item
            icon='delete'
            text='Clear search history'
            onClick={() => resetHistory()}
          />
        </Dropdown.Menu>
      </Dropdown>
    </Menu.Item>
  </Menu>
)

const onClickHistoryRemoveName = nextName => store.dispatch(historyRemoveName(nextName))
const HistorySearchContainer = ({ items }) => (
  <SearchHistoryComponent
    hideHeader={true}
    items={items}
    onClickRemoveItem={onClickHistoryRemoveName}
  />
)

const HistoryModal = ({ modalState, onClickClose, children }) => (
  <Modal
    onClose={onClickClose}
    open={modalState}
    size='small'
  >
    <Modal.Header>
      Recent search
    </Modal.Header>
    <Modal.Content>
      {children}
    </Modal.Content>
    <Modal.Actions>
      <Button icon='close' content='Close' onClick={onClickClose} />
    </Modal.Actions>
  </Modal>
)

const Root = connect(state => state)(withRouter(class RootComp extends Component {
  state = {
    modalState: false
  }

  constructor(props) {
    super(props)
    this.init = this.init.bind(this)
    this.onClickShowHistory = this.onClickShowHistory.bind(this)
  }

  componentWillMount() {
    this.init()
  }

  showHomePage = () => {
    return this.props.location.pathname !== '/'
  }

  init() {
    championGetList()
      .then(data => championSetList(data))
      .catch(() => championSetList([]))
  }

  onClickShowHistory() {
    this.setState({
      modalState: this.state.modalState ? false : true
    })
  }

  render() {
    return (
      <div className="app">
        <MenuTop
          history={this.props.history}
          onClickShowHistory={this.onClickShowHistory}
          showBackButton={this.showHomePage()}
        />

        {this.showHomePage() &&
          <HomePage size='min' />
        }

        <Switch>
          <Route path="/" exact component={HomePage} />
          <Route path="/summoner/:summonerName" component={SummonerPage} />
          <Route path="*" component={PageNotFound} />
        </Switch>

        <HistoryModal
          modalState={this.state.modalState}
          onClickClose={this.onClickShowHistory}
        >
          <HistorySearchContainer items={this.props.historySearch.data} />
        </HistoryModal>
      </div>
    )
  }
}))

export default App
