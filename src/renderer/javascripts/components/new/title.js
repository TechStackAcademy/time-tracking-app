import React from 'react'

export const Title = ({ title, onChange }) => {
  return (
    <div className="details">
      <textarea 
        value={title}
        cols="0" 
        rows="1" 
        placeholder="Start new acitivity"
        onChange={e => onChange(e.target.value)}
      >
      </textarea>
    </div>
  )
}