import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'

import store from '@store/rootStore'

import 'semantic-ui-css/semantic.min.css'
import './App.scss'

import RootContainer from './Containers/Root'

const App = () => (
  <Provider store={store}>
    <BrowserRouter>
      <RootContainer />
    </BrowserRouter>
  </Provider>
)

export default App
