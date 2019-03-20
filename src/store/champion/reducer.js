import * as action from './actions'

export const championMock = {
  key: 0,
  name: 'Undefined'
}

const defaultState = {
  list: []
}

function championSetList(state, nextAction) {
  const nextState = {...state}
  nextState.list = nextAction.nextData
  return nextState
}

const reducer = (state = defaultState, nextAction) => {
  switch (nextAction.type) {
    case action.CHAMPION_SET_LIST:
      return championSetList(state, nextAction)
    default:
      return state
      break
  }
}

export default reducer
