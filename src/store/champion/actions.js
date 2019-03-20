import store from '../rootStore'

export const CHAMPION_SET_LIST = 'CHAMPION_SET_LIST'

export const championSetList = nextData => store.dispatch({
  type: CHAMPION_SET_LIST,
  nextData
})
