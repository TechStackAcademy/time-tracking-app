import React, { useState, useEffect } from 'react'
import classnames from 'classnames'
import { DateTime } from 'luxon'
import { nanoid } from 'nanoid'
import { Title } from './title'
import { Actions } from './actions'

export const New = () => {
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
    setRunning(true)
    window.startTimer()
  }

  return (
    <div className={classnames('new-entry', { disabled: running })}>
      <Title title={title} onChange={(val) => setTitle(val)} />
      <Actions
        disabled={title === ''}
        duration={time}
        running={running}
        onStopTimer={handleStopTimer}
        onStartTimer={handleStartTimer}
      />
    </div>
  )
}
