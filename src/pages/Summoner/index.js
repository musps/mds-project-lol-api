import React, { Component, Fragment } from 'react'
import Avatar from '@atlaskit/avatar'
import Badge from '@atlaskit/badge'
import { withRouter } from 'react-router'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import classNames from 'classnames'
import axios from 'axios'
import EmptyState from '@atlaskit/empty-state'
import Button from '@atlaskit/button'

import './index.scss'

import store from '@store/rootStore'

import { SummonerRankTree } from '@components/SummonerRankCard'
import { MatchHistory } from '@components/MatchHistory'
import LoaderComponent from '@components/Loader'

import { summonerGetData, summonerUpdateLastMatch } from '@store/summoner/requests'
import { summonerSetMatch, summonerSetLoaderMatch } from '@store/summoner/actions'
import { championMock } from '@store/champion/reducer'

const onSuccessSetMatch = nextData => store.dispatch(summonerSetMatch(nextData))

const updateMatchLoader = nextState => {
  console.log('updateMatchLoader', nextState)
  store.dispatch(summonerSetLoaderMatch(nextState))
}

const normalizeSummonerName = (n = '') => n.replace( /\s/g, '').toUpperCase()

const isUserNotFound = data => data.name === ''

const formatMatchHistory = (matches, sourceAccountId, champions) => {
  if (typeof sourceAccountId === 'undefined') {
    return []
  } else {
    return matches.map(match => {
      const targetUser = match.participantIdentities.find(p =>
        p.player.currentAccountId === sourceAccountId
      )
      const userId = targetUser.participantId
      const userGameData = match.participants[(userId - 1)]
      const userTeamId = userGameData.teamId
      const userGameInfo = match.teams.find(t => t.teamId === userTeamId)

      return {
        game: {
          id: match.gameId,
          duration: match.gameDuration,
          creation: match.gameCreation
        },
        victory: userGameInfo.win,
        champion: champions.find(c => c.key === `${userGameData.championId}`) || championMock,
        name: targetUser.player.summonerName,
        stats: userGameData.stats
      }
    })
  }
}

const getSummonerIconUrl = summonerName => {
  const name = normalizeSummonerName(summonerName)
  const uri = `https://avatar.leagueoflegends.com/EUW1/${name}.png`
  return uri
}

const SummonerNotFound = ({ name }) => (
  <EmptyState
    header={'404 - Summoner Not Found'}
    primaryAction={
      <Link to='/'>
        <Button appearance='primary'>Go back home</Button>
      </Link>
    }
    secondaryAction={
      <Link to={`/summoner/${name}`}>
        <Button>Try again</Button>
      </Link>
    }
  />
)

const SummonerPageComp = ({
  tmpSummonerName,
  summonerData,
  summonerRank,
  matches,
  onClickLoadMore,
  isLoadingHistory,
  isLoadingUser
}) => (
  <div className="summonerPage">
    {isLoadingUser ? (
      <LoaderComponent />
    ) : (
      <Fragment>
        <div className="summonerPageHeader">
          <Avatar
            name="xxlarge"
            size="xxlarge"
            src={getSummonerIconUrl(summonerData.name)}
           />
          <p className="summonerName">
            {summonerData.name}
          </p>
        </div>

        {isUserNotFound(summonerData) ? (
          <SummonerNotFound name={tmpSummonerName} />
        ) : (
          <div className="summonerPageContent">
            <div className="summonerRankStatus">
              <SummonerRankTree summonerRank={summonerRank} />
            </div>

            <div className="summonerLastMatches">
              <MatchHistory
                matches={matches}
                sourceAccountId={summonerData.accountId}
                onClickLoadMore={onClickLoadMore}
                isLoading={isLoadingHistory}
              />
            </div>
          </div>
        )}
      </Fragment>
    )}
  </div>
)

class SummonerPage extends Component {
  constructor(props) {
    super(props)
    this.onClickLoadMore = this.onClickLoadMore.bind(this)
  }

  onClickLoadMore() {
    updateMatchLoader(true)
    summonerUpdateLastMatch(this.props.summoner.data.summonerData.name)
      .then(onSuccessSetMatch)
      .catch(e => console.log(e))
  }

  render() {
    const {
      champion,
      summoner: {
        tmpSummonerName,
        data: {
          summonerData, summonerRank
        },
        matches,
        loader
      }
    } = this.props

    const matchHistory = formatMatchHistory(
      matches,
      summonerData.accountId,
      champion.list
    )

    return (
      <SummonerPageComp
        tmpSummonerName={tmpSummonerName}
        summonerRank={summonerRank}
        summonerData={summonerData}
        matches={matchHistory}
        onClickLoadMore={this.onClickLoadMore}
        isLoadingHistory={loader.matches}
        isLoadingUser={loader.data}
      />
    )
  }
}

export default connect(state => state)(withRouter(SummonerPage))
