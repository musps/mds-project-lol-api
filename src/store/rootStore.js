import { 
  createStore,
  combineReducers,
  applyMiddleware,
  compose
} from 'redux'

import summonerStore from './summoner/reducer'
import championStore from './champion/reducer'
import historyStore from './/history/reducer'

const reducers = combineReducers({
  summoner: summonerStore,
  champion: championStore,
  historySearch: historyStore
})

const middlewares = compose(
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)

const store = createStore(
  reducers,
  middlewares
)

export default store
