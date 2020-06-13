import React, { useState, useEffect } from 'react'
import { Title } from './title'
import { Actions } from './actions'

export const New = ({ title: defaultTitle, time: defaultTime }) => {
  const [title, setTitle] = useState(defaultTitle)
  const [time, setTime] = useState(defaultTime)
  const [running, setRunning] = useState(false)

  useEffect(() => {
    window.subscribeForTimer((_, data) => {
      setTitle(data.title)
      setTime(data.time)
      setRunning(true)
    })
  }, [])

  const handleStartTimer = () => {
    setRunning(true)
    window.startTimer(title)
  }

  const handleStopTimer = () => {
    setRunning(false)
    setTime(0)
    setTitle('')
    window.stopTimer()
  }

  return (
    <div className="new-entry">
      <Title title={title} onChange={(val) => setTitle(val)} />
      <Actions 
        disabled={title === ''}
        duration={time}
        running={running}
        onStartTimer={handleStartTimer}
        onStopTimer={handleStopTimer}
      />
    </div>
  )
}