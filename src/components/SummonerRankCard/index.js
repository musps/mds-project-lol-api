import React, { Component, Fragment } from 'react'
import { Card, Icon, Image } from 'semantic-ui-react'
import './index.scss'

const rankTypeToStr = type => {
  const types = {
    RANKED_SOLO_5x5: 'Ranked Solo/Duo',
    RANKED_FLEX_SR: 'Ranked Team 5x5',
    RANKED_FLEX_TT: 'Ranked Team 3x3',
    UNRANKED: 'Unranked'
  };
  const nextType = types[type] || types['UNRANKED']
  return nextType
}

const SummonerRankCard = ({ rank }) => (
  <Card className="summonerRankCard">
    <div className="rankImg">
      {rank.tier !== 'UNRANKED' &&
        <Image
          size='small'
          src={`http://localhost:3000/static_content/emblems/Emblem_${rank.tier}.png`}
        />
      }
    </div>
    <Card.Content>
      <Card.Header>{rank.tier} {rank.rank}</Card.Header>
      <Card.Meta>
        <span className='date'>{rankTypeToStr(rank.queueType)}</span>
      </Card.Meta>
      <Card.Meta>
        <span className='date'>{rank.leagueName}</span>
      </Card.Meta>
    </Card.Content>
    <Card.Content extra>
      <Icon name='database' />
      {rank.leaguePoints} LP - {rank.wins}W / {rank.losses}L
    </Card.Content>
  </Card>
)

export function SummonerRankTree({ summonerRank }) {
  const mockRank = (queueType) => ({
    tier: 'UNRANKED',
    rank: null,
    leagueName: null,
    queueType: queueType,
    leaguePointsm: 0,
    wins: 0,
    losses: 0,
  })

  const rankSoloDuo = summonerRank.find(r => r.queueType === 'RANKED_SOLO_5x5') || mockRank('RANKED_SOLO_5x5')
  const rankFlex5 = summonerRank.find(r => r.queueType === 'RANKED_FLEX_SR') || mockRank('RANKED_FLEX_SR')
  const rankFlex3 = summonerRank.find(r => r.queueType === 'RANKED_FLEX_TT') || mockRank('RANKED_FLEX_TT')

  return (
    <Fragment>
      <SummonerRankCard rank={rankFlex3} />
      <SummonerRankCard rank={rankSoloDuo} />
      <SummonerRankCard rank={rankFlex5} />
    </Fragment>
  )
}

export default SummonerRankCard
