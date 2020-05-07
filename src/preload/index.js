import { ipcRenderer } from 'electron'


window.startTimer = () => {
  ipcRenderer.send('timer:start')
}

window.stopTimer = () => {
  return new Promise((resolve, reject) => {
    ipcRenderer.send('timer:stop')
    ipcRenderer.once('timer:stopped', (_, data) => {
      resolve(data.time)
    })
  })
}

window.subscribeForTimer = callback => {
  ipcRenderer.on('tick', callback)
}

window.subscribeForEntries = callback => {
  ipcRenderer.on('entries', callback)
}

window.saveEntry = data => {
  ipcRenderer.send('save', data)
}
