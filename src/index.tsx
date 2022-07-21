import React from 'react'
import ReactDOM from 'react-dom/client'

import './assets/styles/reset.css'
import './assets/styles/global.css'

import App from './App'
import {Provider} from 'react-redux'
import {store} from './store'

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
)

root.render(
  <Provider store={store}>
    <App/>
  </Provider>
)
