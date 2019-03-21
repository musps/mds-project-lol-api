import React, { Component, Fragment } from 'react'
import { withRouter } from 'react-router'
import { connect } from 'react-redux'
import { Dropdown, Menu, Icon } from 'semantic-ui-react'

import store from '@store/rootStore'
import { historyReset } from '@store/history/actions'
import HistorySearchContainer, { HistoryModal } from './History'

const resetHistory = () => store.dispatch(historyReset())

const MenuComponent = ({
  modalState,
  showBackButton = false,
  history,
  onClickShowHistory,
  items
}) => (
  <Fragment>
    <Menu className="menuTop">
      {showBackButton && (
        <Fragment>
          <Menu.Item
            className="btnGoBack"
            name="goback"
            onClick={() => history.goBack()}
          >
            <Icon name="arrow left" />
          </Menu.Item>

          <Menu.Item
            name="home"
            content="Home"
            onClick={() => history.push('/')}
          />

          <Menu.Item
            name="recentsearch"
            content="Recent search"
            onClick={onClickShowHistory}
          />
        </Fragment>
      )}

      <Menu.Item
        name="goback"
        position="right"
        className="btnGoBack"
      >
        <Dropdown item icon="ellipsis vertical" position="right" direction="left">
          <Dropdown.Menu>
            <Dropdown.Item
              icon="delete"
              text="Clear search history"
              onClick={() => resetHistory()}
            />
          </Dropdown.Menu>
        </Dropdown>
      </Menu.Item>
    </Menu>

    <HistoryModal modalState={modalState} onClickClose={onClickShowHistory}>
      <HistorySearchContainer items={items} />
    </HistoryModal>
  </Fragment>
)

class MenuContainer extends Component {
  state = {
    modalState: false
  }

  constructor(props) {
    super(props)
    this.onClickShowHistory = this.onClickShowHistory.bind(this)
  }

  onClickShowHistory() {
    this.setState(prevState => ({
      modalState: prevState.modalState ? false : true
    }))
  }

  showBackButton = () => this.props.location.pathname !== '/'

  render() {
    return (
      <MenuComponent
        modalState={this.state.modalState}
        showBackButton={this.showBackButton()}
        history={this.props.history}
        onClickShowHistory={this.onClickShowHistory}
        items={this.props.historySearch.data}
      />
    )
  }
}

export default connect(state => state)(withRouter(MenuContainer))
