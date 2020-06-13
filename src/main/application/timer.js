export class Timer {
  constructor() {
    this.time = 0
    this.onChange = null
  }

  start() {
    this.interval = setInterval(() => {
      this.time++
      if (this.onChange) this.onChange()
    }, 1000)
  }

  stop() {
    const result = this.time
    clearInterval(this.interval)
    this.time = 0
    return result
  }

  get() {
    return this.time
  }

  isRunning() {
    return !!this.interval
  }
}