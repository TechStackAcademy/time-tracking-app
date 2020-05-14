import { autoUpdater } from 'electron-updater'

// Configure log
autoUpdater.logger = require("electron-log")
autoUpdater.logger.transports.file.level = "info"

export const checkForUpdates = () => {
  // Check for updates on GH
  autoUpdater.checkForUpdatesAndNotify()
}