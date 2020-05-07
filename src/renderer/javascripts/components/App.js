import React from 'react'

import { NewEntry } from './NewEntry'
import { List } from './List'

export const App = ({ entries }) => {
  return (
    <>
      <NewEntry />
      <List entries={entries} />
    </>
  )
}
