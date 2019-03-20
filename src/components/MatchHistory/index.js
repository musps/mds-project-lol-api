import React, { Component, Fragment } from 'react'
import Avatar from '@atlaskit/avatar'
import classNames from 'classnames'
import './index.scss'
import ErrorBox from '../ErrorBox'
import moment from 'moment'
import { Icon, Segment, Dimmer, Loader, Image } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import LoaderComponent from '../Loader'

const matchItemCls = (victory = false) => (classNames({
  matchItem: true,
  bgGreen: victory,
  bgRed: !victory
}))

const isVictory = win => win === 'Win'

const matchStateToStr = win => isVictory(win) ? 'Victory' : 'Defeat'

const kdaToStr = ({ kills, deaths, assists, }) => `${kills} / ${deaths} / ${assists}`

const gameCreationFromNow = timestamp => moment(new Date(timestamp), 'YYYYMMDD').fromNow();

const gameDurationToTime = secondes => {
  const targetFormat = secondes < 3600 ? 'mm:ss' : 'H:mm:ss'
  return moment('2015-01-01').startOf('day').seconds(secondes).format(targetFormat)
}

export const MatchItemHeader = ({ }) => {
  return (
    <div className="matchItem matchItemHeader">
      <div className="playerGroup playerLeft">
        <h2 className="playerName">
          Match history <span className="kda">K / D / A</span>
        </h2>
      </div>
    </div>
  )
}

export const MatchItem = ({ match, sourceAccountId }) => {
  const { victory, champion, name, stats, game } = match

  return (
    <div className={matchItemCls(isVictory(victory))}>
      <div className="playerGroup playerLeft">
        <Avatar
          name="xxlarge"
          src={`http://ddragon.leagueoflegends.com/cdn/8.24.1/img/champion/${champion.image.full}`}
        />
        <h2 className="playerName">
          {matchStateToStr(victory)}
          <span className="kda">
            {kdaToStr(stats)}
          </span>

          <span className="duration">
            <Icon name='time' /> {gameDurationToTime(game.duration)}
            <b> - </b> 
            <Icon name='calendar alternate outline' /> {gameCreationFromNow(game.creation)}

            <span className="creeps">
              {stats.totalMinionsKilled} <Icon name='optin monster' />
            </span>
          </span>
        </h2>
      </div>
    </div>
  )
}

export const CustomBtn = ({ value, onClickBtn }) => (
  <button type='button' className="custonBtn" onClick={onClickBtn}>
    {value}
  </button>
)

export const MatchHistory = ({ matches, sourceAccountId = null, onClickLoadMore, isLoading = false }) => (
  <div className="matchHistory">
    <MatchItemHeader />

    {(matches.length === 0 && !isLoading) &&
      <ErrorBox
        title='Error - Match history !'
        description='There are no results recorded.'
        btnValue='Refresh data'
      />
    }

    {isLoading === true ? (
      <div className="matchItem divLoadMoreSchimmer">
        <LoaderComponent />
      </div>
    ) : (
      <div className="matchItem divLoadMore">
        <CustomBtn onClickBtn={onClickLoadMore} value='Update history' />
      </div>
    )}

    {matches.map((match, key) => (
       <MatchItem
         key={key}
         match={match}
         sourceAccountId={sourceAccountId}
       />
    ))}
  </div>
)
