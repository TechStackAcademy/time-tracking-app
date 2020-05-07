export const durationToTime = duration => {
  const date = new Date(0)
  date.setSeconds(duration)
  return date.toISOString().substr(11, 8)
}
