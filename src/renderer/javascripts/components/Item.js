import React from 'react'

export const Item = ({ title, project, time }) => {
  return (
    <div className="entry">
      <div className="details">
        <div className="primary">{title}</div>
        <div className="secondary">{project}</div>
      </div>
      <div className="actions">
        <div className="time">{time}</div>
      </div>
    </div>
  )
}
