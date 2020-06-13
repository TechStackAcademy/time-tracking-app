import React from 'react'

import { New } from './new'
import { Entries } from './entries'

export const App = ({ entries, title, time }) => {
  return (
    <>
      <New time={time} title={title} />
      <Entries entries={entries} />
    </>
  )
}