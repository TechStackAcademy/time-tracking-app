import React from 'react'
import { orderBy } from 'lodash'
import { Item } from './Item'

export const List = ({ entries }) => {
  return (
    <div className="entries">
      {/* <div className="divider">
        Monday, 4 May
      </div> */}
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
