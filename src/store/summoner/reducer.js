import * as action from './actions'

const mockSummonerData = {
    summonerData: {
      name: '',
      profileIconId: '',
      summonerLevel: 0
    },
    summonerRank: []
}

const defaultState = {
  tmpSummonerName: '',
  summonerName: '',
  data: {
    summonerData: {
      name: '',
      profileIconId: '',
      summonerLevel: 0
    },
    summonerRank: []
  },
  matches: [],
  loader: {
    data: true,
    matches: true
  }
}

function summonerSetName(state, { nextName }) {
  const nextState = {...state}
  nextState.tmpSummonerName = nextName
  return nextState
}

function summonerSaveName(state, { nextName }) {
  const nextState = {...state}
  nextState.summonerName = nextName
  nextState.data = {...mockSummonerData}
  nextState.matches = []
  nextState.loader.data = true
  nextState.loader.matches = true
  return nextState
}

function summonerSetData(state, { nextData }) {
  const nextState = {...state}

  if (nextData === null) {
    nextState.data = {...mockSummonerData}
  } else {
    nextState.data = nextData
  }

  nextState.loader.data = false
  return nextState
}

function summonerSetMatch(state, { nextMatch }) {
  const nextState = {...state}
  nextState.matches = nextMatch

  nextState.loader.matches = false
  return nextState
}

function summonerSetLoaderMatch(state, nextAction) {
  const nextState = {...state}
  nextState.loader.matches = nextAction.nextState
  return nextState
}

const reducer = (state = defaultState, nextAction) => {
  switch (nextAction.type) {
    case action.SUMMONER_SET_NAME:
      return summonerSetName(state, nextAction)
    case action.SUMMONER_SAVE_NAME:
       return summonerSaveName(state, nextAction)
    case action.SUMMONER_SET_DATA:
       return summonerSetData(state, nextAction)
    case action.SUMMONER_SET_MATCH:
       return summonerSetMatch(state, nextAction)
    case action.SUMMONER_SET_LOADER_MATCH:
       return summonerSetLoaderMatch(state, nextAction)
    default:
      return state
      break
  }
}

export default reducer
