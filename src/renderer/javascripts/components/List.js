import React from 'react'
import { nanoid } from 'nanoid'
import { Item } from './Item'

export const List = () => {
  const entries = [
    { id: nanoid(), title: 'Watching course on Udemy', project: 'Education', time: '00:33:21' },
    { id: nanoid(), title: 'Worked on Timer application', project: 'Work', time: '01:45:11' },
    { id: nanoid(), title: 'Setup project', project: 'MyProject', time: '02:15:24' },
  ]

  return (
    <div className="entries">
      {/* <div className="divider">
        Monday, 4 May
      </div> */}
      {entries.map(entry =>
        <Item
          key={entry.id}
          title={entry.title}
          project={entry.project}
          time={entry.time}
        />
      )}
    </div>
  )
}
