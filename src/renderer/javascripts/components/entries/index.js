import React from 'react'
import { orderBy } from 'lodash'
import { Item } from './Item'

export const Entries = ({ entries }) => {
  return (
    <div className="entries">
      {!entries && <div className="empty-state">No entries</div>}
      {entries && orderBy(entries, 'createdAt', 'desc').map(entry =>
        <Item 
          key={entry.id}
          title={entry.title}
          duration={entry.duration}
          project={entry.project}
        />
      )}
    </div>
  )
}