import React from 'react'
import ReactDOM from 'react-dom'
import { App } from 'components/App'

require('application.css')

window.subscribeForEntries((_, data) => {
  renderApp(data)
})

const renderApp = ({ entries, time, title }) => {
  ReactDOM.render(<App entries={entries} title={title} time={time} />, document.getElementById('root'))
}
