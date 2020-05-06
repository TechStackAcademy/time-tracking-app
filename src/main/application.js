import path from 'path'
import { app, BrowserWindow, ipcMain } from 'electron'
import { Timer } from './timer'


export default class TimerApp {

  constructor() {
    this.timer = new Timer()
    app.whenReady().then(() => this.createWindow())

    app.on('window-all-closed', () => {
      if (process.platform !== 'darwin') app.quit()
    })

    app.on('activate', () => {
      if (BrowserWindow.getAllWindows().length === 0) {
        this.createWindow()
      }
    })

    ipcMain.on('timer:start', () => {
      this.timer.start()
    })

    ipcMain.on('timer:stop', () => {
      const time = this.timer.stop()
      this.window.webContents.send('timer:stopped', { time })
    })
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
    this.window.webContents.openDevTools({ mode: 'detach' })

    this.timer.onChange = () => {
      this.window.webContents.send('tick', { time: this.timer.get() })
    }

    this.window.on('closed', () => {
      this.timer.onChange = null
      this.window = null
    })
  }
}

