import React from 'react'
import { durationToTime } from 'helpers/time'

export const Item = ({ title, project, duration }) => {
  return (
    <div className="entry">
      <div className="details">
        <div className="primary">{title}</div>
        <div className="secondary">{project}</div>
      </div>
      <div className="actions">
        <div className="time">{durationToTime(duration)}</div>
      </div>
    </div>
  )
}
