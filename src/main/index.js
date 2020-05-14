import TimerApp from './application'
import { checkForUpdates } from './updater'

new TimerApp()
setTimeout(() => {
  checkForUpdates()
}, 2000)
