import React from 'react'

export const Title = ({ title, onChange }) => {
  return (
    <div className="details">
      <textarea
        value={title}
        onChange={e => onChange(e.target.value)}
        placeholder="Start new activity"
        cols="0"
        rows="1"
      ></textarea>
    </div>
  )
}
