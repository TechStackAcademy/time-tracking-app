export class Timer {
  constructor() {
    this.timeElapsed = 0
    this.onChange = null
  }

  start() {
    this.interval = setInterval(() => {
      this.timeElapsed++
      if (this.onChange) this.onChange()
    }, 1000)
  }

  stop() {
    const result = this.timeElapsed
    clearInterval(this.interval)
    this.timeElapsed = 0
    return result
  }

  get() {
    return this.timeElapsed
  }

  isRunning() {
    return !!this.interval
  }
}
