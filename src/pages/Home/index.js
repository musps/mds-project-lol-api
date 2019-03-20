import React, { Component } from 'react'
import { withRouter, matchPath } from 'react-router'
import { Link } from 'react-router-dom'
import { Icon, Input, Button } from 'semantic-ui-react'
import { connect } from 'react-redux'

import './index.scss'

import store from '../../store/rootStore'

import {
    summonerSetName,
    summonerSaveName,
    summonerSetData,
    summonerSetMatch
} from '../../store/summoner/actions'
import {
  historyAddName,
  historyRemoveName,
  historyInitialize
} from '../../store/history/actions'
import { summonerGetData, summonerGetLastMatch } from '../../store/summoner/requests'
import SearchHistoryComponent from '../../components/SearchHistory'

function preventDefault(e) {
  e.preventDefault()

  return function (onSubmit) {
    onSubmit.call()
  }
}

const onSubmitSaveName = nextName => store.dispatch(summonerSaveName(nextName))
const onChangeSetName = nextName => store.dispatch(summonerSetName(nextName))
const onChangeHistoryAddName = nextName => store.dispatch(historyAddName(nextName))
const onClickHistoryRemoveName = nextName => store.dispatch(historyRemoveName(nextName))
const onConstructInitializeHistory = nextName => store.dispatch(historyInitialize())
const onSuccessSetData = nextData => {
  // Add fake latency.
  setTimeout(() => store.dispatch(summonerSetData(nextData)), 750)
}

const onSuccessSetMatch = nextData => store.dispatch(summonerSetMatch(nextData))

const HomePageView = ({ isMainView = true, inputRef, size, value, onChangeName, onSubmit, historySearch }) => {
  return (
    <div className={`homePage homePage__${size}`}>

      {isMainView &&
        <h1>Stats.win</h1>
      }

      <form
        className="formSelectSummoner"
        onSubmit={e => preventDefault(e)(onSubmit)}
      >
        <Input
          className="inputSearch"
          size='big'
          icon='search'
          placeholder='Search...'
          value={value}
          onChange={onChangeName}
          ref={inputRef}
        />

        {(size === 'full' && historySearch.length > 0) && (
          <HistorySearchContainer
            items={historySearch}
          />
        )}
      </form>
    </div>
  )
}

const HistorySearchContainer = ({ items }) => (
  <SearchHistoryComponent
    items={items}
    onClickRemoveItem={onClickHistoryRemoveName}
  />
)

class HomePage extends Component {
  state = {
    size: 'full',
    inputRef: React.createRef()
  }

  constructor(props) {
    super(props)
    this.state.size = props.size || 'full'
    this.onSubmit = this.onSubmit.bind(this)
    this.onChangeName = this.onChangeName.bind(this)
    this.fetchSummonerData = this.fetchSummonerData.bind(this)
    this.onRouteChange = this.onRouteChange.bind(this)

    onConstructInitializeHistory()
  }

  componentDidUpdate(prevProps) {
    if (this.props.location.pathname === '/') {
      this.state.inputRef.current.focus()
    }

    if (this.props.location !== prevProps.location) {
      this.onRouteChange()
    }
  }

  componentWillMount() {
    this.onRouteChange()
  }

  async fetchSummonerData(summonerName = '') {
    onChangeHistoryAddName(summonerName)
    onSubmitSaveName(summonerName)
    const summonerData =  await summonerGetData(summonerName).catch(() => null)
    if (summonerData === null) {
      onSuccessSetData(null)
    } else {
      onSuccessSetData(summonerData.data.data)
    }
    const matchHistory = await summonerGetLastMatch(summonerName).catch(() => [])
    onSuccessSetMatch(matchHistory)
  }

  onRouteChange() {
    const match = matchPath(this.props.history.location.pathname, {
      path: '/summoner/:summonerName',
      exact: false,
      strict: false
    })
    if (match !== null) {
      const summonerName = match.params.summonerName
      onChangeSetName(summonerName)
      this.fetchSummonerData(summonerName)
    }
  }

  onChangeName(e) {
    const nextName = e.target.value
    onChangeSetName(nextName)
  }

  async onSubmit() {
    const summonerName = this.props.summoner.tmpSummonerName

    try {
      if (summonerName !== '') {
        onSubmitSaveName(summonerName)
        onChangeHistoryAddName(summonerName)
        this.props.history.push(`/summoner/${summonerName}`)
        const endpoint = 'http://127.0.0.1:8080'
        const summonerData =  await summonerGetData(summonerName);
        onSuccessSetData(summonerData.data.data)
      }
    } catch (e) {
      // this.props.history.push(`/summoner/${summonerName}`)
    }
  }

  isMainView = () => this.props.location.pathname === '/'

  render() {
    const { tmpSummonerName, summonerName } = this.props.summoner
    const { state: { size }, onChangeName, onSubmit } = this

    return (
      <HomePageView
        size={size}
        value={tmpSummonerName}
        onChangeName={onChangeName}
        onSubmit={onSubmit}
        historySearch={this.props.historySearch.data}
        inputRef={this.state.inputRef}
        isMainView={this.isMainView()}
      />
    )
  }
}

export default connect(state => state)(withRouter(HomePage))
