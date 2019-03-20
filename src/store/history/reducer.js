import * as action from './actions'

const maxHistorySize = 10

const normalizeName = name => name.replace( /\s/g, '').toUpperCase()

const defaultState = {
  data: []
}

const lsHistory = {
  key: 'LS_HISTORY',
  get: () => {
    let output = defaultState
    let items = localStorage.getItem(lsHistory.key) || null

    if (items !== null) {
      try {
        output = JSON.parse(items)
      } catch (onErrorParse) {
        // Reset local storage.
        lsHistory.set(output)
      }
    }
    return output
  },
  set: (data) => {
    localStorage.setItem(lsHistory.key, JSON.stringify(data))
  }
}

function historyAddName(state, { nextName }) {
  const nextState = {...state}
  const prevIndex = nextState.data.findIndex(i => normalizeName(i.name) === normalizeName(nextName))

  if (prevIndex === -1) {
    nextState.data.unshift({
      name: nextName,
      updatedAt: Date.now()
    })
    if (nextState.data.length > maxHistorySize) {
      nextState.data = nextState.data.slice(0, maxHistorySize)
    }
  } else {
    nextState.data[prevIndex].updatedAt = Date.now()
  }

  lsHistory.set(nextState)
  return nextState
}

function historyRemoveName(state, { nextName }) {
  const nextState = {...state}
  nextState.data = nextState.data.filter(i => normalizeName(i.name) !== normalizeName(nextName))
  lsHistory.set(nextState)
  return nextState
}

function historyInitialize(state) {
  const nextState = lsHistory.get()
  return nextState
}

function historyReset(state) {
  const nextState = {...state}
  nextState.data = []
  lsHistory.set(nextState)
  return nextState
}

const reducer = (state = defaultState, nextAction) => {
  switch (nextAction.type) {
    case action.HISTORY_ADD_NAME:
      return historyAddName(state, nextAction)
   case action.HISTORY_REMOVE_NAME:
      return historyRemoveName(state, nextAction)
   case action.HISTORY_INITIALIZE:
      return historyInitialize(state)
   case action.HISTORY_RESET:
       return historyReset(state)
    default:
      return state
      break
  }
}

export default reducer
