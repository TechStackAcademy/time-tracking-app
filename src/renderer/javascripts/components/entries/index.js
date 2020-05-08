import React from 'react'
import { orderBy } from 'lodash'
import { Item } from './Item'

export const Entries = ({ entries }) => {
  return (
    <div className="entries">
      {orderBy(entries, 'createdAt', 'desc').map(entry =>
        <Item
          key={entry.id}
          title={entry.title}
          project={entry.project}
          duration={entry.duration}
        />
      )}
    </div>
  )
}
