import { ipcRenderer } from 'electron'

window.subscribeForEntries = callback => {
  ipcRenderer.on('entries', callback)
}

window.subscribeForTimer = callback => {
  ipcRenderer.on('tick', callback)
}

window.startTimer = title => {
  ipcRenderer.send('timer:start', { title })
}

window.stopTimer = () => {
  ipcRenderer.send('timer:stop')
}