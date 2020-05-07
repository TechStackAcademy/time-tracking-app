import React, { useState, useEffect } from 'react'
import classnames from 'classnames'
import { DateTime } from 'luxon'
import { nanoid } from 'nanoid'
import { durationToTime } from 'helpers/time'
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
    stopTimer().then(duration => {
      window.saveEntry({
        id: nanoid(),
        duration: duration,
        title: title,
        project: 'None',
        createdAt: DateTime.local().toISO()
      })
      setTitle('')
      setTime(0)
      setRunning(false)
    })
  }

  const handleStartTimer = () => {
    window.startTimer()
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
        <div className="time">{durationToTime(time)}</div>
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
