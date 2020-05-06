import React, { useState, useEffect } from 'react'
import classnames from 'classnames'
import { nanoid } from 'nanoid'
import PlayIcon from 'play.svg'
import StopIcon from 'stop.svg'

export const NewEntry = () => {
  const [running, setRunning] = useState(false)
  const [time, setTime] = useState(0)
  const [title, setTitle] = useState('')

  useEffect(() => {
    window.subscribeForTimer((_, data) => {
      setTime(data.time)
      setRunning(true)
    })
  }, [])

  const handleStopTimer = () => {
    stopTimer().then(time => {
      const entry = { id: nanoid(), time: time, title: title, project: 'None' }
      setTitle('')
      setTime(0)
      setRunning(false)
    })
  }

  const handleStartTimer = () => {
    window.startTimer()
  }

  const formattedTime = () => {
    const date = new Date(0)
    date.setSeconds(time)
    return date.toISOString().substr(11, 8)
  }

  return (
    <div className={classnames('new-entry', { disabled: running })}>
      <div className="details">
        <textarea
          value={title}
          onChange={e => setTitle(e.target.value)}
          placeholder="Start new activity"
          cols="0"
          rows="1"
        ></textarea>
      </div>
      <div className="actions">
        <div className="time">{formattedTime()}</div>
        <div
          className={classnames('trigger', { disabled: title === ''})}
          onClick={running ? handleStopTimer : handleStartTimer}
        >
          {running ? <StopIcon width="24" height="24" /> : <PlayIcon width="24" height="24" />}
        </div>
      </div>
    </div>
  )
}
