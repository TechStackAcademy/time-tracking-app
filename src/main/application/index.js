import path from 'path'
import { app, BrowserWindow, ipcMain } from 'electron'
import { nanoid } from 'nanoid'
import { DateTime } from 'luxon'
import { Storage } from './storage'
import { Timer } from './timer'

export default class TimerApp {
  constructor() {
    this.entry = {}
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
      maxWidth: CONFIG.width,
      maxHeight: CONFIG.height,
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
      this.window.webContents.send('entries', { 
        title: this.entry.title,
        time: this.timer.get(),
        entries: this.storage.get('entries') 
      })
    })

    this.window.on('closed', () => {
      this.timer.onChange = null
      this.window = null
    })
  }

  subscribeForAppEvents() {
    app.on('window-all-closed', () => {
      if (process.platform !== 'darwin') {
        app.quit()
      }
    })

    app.on('activate', () => {
      if (BrowserWindow.getAllWindows().length === 0) {
        this.createWindow()
      }
    })
  }

  subscribeForIPC() {
    ipcMain.on('timer:start', (_, data) => {
      this.timer.start()
      this.createEntry(data.title)
    })

    ipcMain.on('timer:stop', () => {
      const duration = this.timer.stop()
      this.entry.duration = duration
      this.saveEntry()
    })
  }

  createEntry(title) {
    this.entry = {
      id: nanoid(),
      duration: 0,
      title: title,
      project: 'none',
      createdAt: DateTime.local().toISO()
    }
  }

  saveEntry() {
    const entries = this.storage.get('entries') || []
    entries.push(this.entry)
    this.storage.set('entries', entries)
    this.window.webContents.send('entries', { entries })
    this.entry = {}
  }
}