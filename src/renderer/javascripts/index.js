import React from 'react'
import ReactDOM from 'react-dom'
import { App } from 'components/App'

require('application.css')

window.onload = () => {
  ReactDOM.render(<App />, document.getElementById('root'))
}
