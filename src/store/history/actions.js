export const HISTORY_ADD_NAME = 'HISTORY_ADD_NAME'
export const HISTORY_REMOVE_NAME = 'HISTORY_REMOVE_NAME'
export const HISTORY_INITIALIZE = 'HISTORY_INITIALIZE'

export const historyAddName = nextName => ({
  type: HISTORY_ADD_NAME,
  nextName
})

export const historyRemoveName = nextName => ({
  type: HISTORY_REMOVE_NAME,
  nextName
})

export const historyInitialize = nextMatch => ({
  type: HISTORY_INITIALIZE,
  nextMatch
})
