import React from 'react'
import ReactDOM from 'react-dom/client'
import './styles/global.scss'
import App from './App'
import { Provider } from 'react-redux'
import store from './store'
import { I18nextProvider } from 'react-i18next'
import configureI18n from 'i18n'
import { BrowserRouter } from 'react-router-dom'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
const i18n = configureI18n()

root.render(
  <BrowserRouter>
    <I18nextProvider i18n={i18n}>
      <Provider store={store}>
        <App />
      </Provider>
    </I18nextProvider>
  </BrowserRouter>
)
