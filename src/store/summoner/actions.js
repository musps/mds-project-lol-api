export const SUMMONER_SET_NAME = 'SUMMONER_SET_NAME'
export const SUMMONER_SAVE_NAME = 'SUMMONER_SAVE_NAME'
export const SUMMONER_SET_DATA = 'SUMMONER_SET_DATA'
export const SUMMONER_SET_MATCH = 'SUMMONER_SET_MATCH'
export const SUMMONER_SET_LOADER_MATCH = 'SUMMONER_SET_LOADER_MATCH'

export const summonerSetName = nextName => ({
  type: SUMMONER_SET_NAME,
  nextName
})

export const summonerSaveName = nextMatch => ({
  type: SUMMONER_SAVE_NAME,
  nextMatch
})

export const summonerSetData = nextData => ({
  type: SUMMONER_SET_DATA,
  nextData
})

export const summonerSetMatch = nextMatch => ({
  type: SUMMONER_SET_MATCH,
  nextMatch
})

export const summonerSetLoaderMatch = nextState => ({
  type: SUMMONER_SET_LOADER_MATCH,
  nextState
})
