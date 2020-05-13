import path from 'path'
import { app, BrowserWindow, ipcMain } from 'electron'
import { Timer } from './timer'
import { Storage } from './storage'

export default class TimerApp {

  constructor() {
    this.timer = new Timer()
    this.storage = new Storage()
    this.subscribeForAppEvents()
    this.subscribeForIPC()
    app.whenReady().then(() => this.createWindow())
  }

  createWindow() {
    this.window = new BrowserWindow({
      title: CONFIG.name,
      width: CONFIG.width,
      height: CONFIG.height,
      minWidth: CONFIG.width,
      minHeight: CONFIG.height,
      titleBarStyle: 'hidden',
      webPreferences: {
        preload: path.join(app.getAppPath(), 'preload', 'index.js')
      }
    })

    this.window.loadFile('renderer/index.html')

    this.timer.onChange = () => {
      this.window.webContents.send('tick', { time: this.timer.get() })
    }

    this.window.webContents.on('did-finish-load', () => {
      this.window.webContents.send('entries', { entries: this.storage.get('entries') })
    })

    this.window.on('closed', () => {
      this.timer.onChange = null
      this.window = null
    })
  }

  subscribeForAppEvents() {
    app.on('window-all-closed', () => {
      if (process.platform !== 'darwin') app.quit()
    })

    app.on('activate', () => {
      if (BrowserWindow.getAllWindows().length === 0) {
        this.createWindow()
      }
    })
  }

  subscribeForIPC() {
    ipcMain.on('timer:start', () => {
      this.timer.start()
    })

    ipcMain.on('timer:stop', () => {
      const time = this.timer.stop()
      this.window.webContents.send('timer:stopped', { time })
    })

    ipcMain.on('save', (_, data) => {
      const entries = this.storage.get('entries') || []
      entries.push(data)
      this.storage.set('entries', entries)
      this.window.webContents.send('entries', { entries })
    })
  }
}

