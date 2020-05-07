import React from 'react'
import ReactDOM from 'react-dom'
import { App } from 'components/App'

require('application.css')

window.subscribeForEntries((event, data) => {
  renderApp(data.entries)
})

const renderApp = (entries = []) => {
  ReactDOM.render(<App entries={entries} />, document.getElementById('root'))
}
