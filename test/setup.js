const path = require('path')
const { Application } = require('spectron')

const appPath = () => {
  switch (process.platform) {
    case 'darwin':
      return path.join(__dirname, '..', '.tmp', 'mac', 'Timer.app', 'Contents', 'MacOS', 'Timer');
    case 'linux':
      return path.join(__dirname, '..', '.tmp', 'linux', 'Timer');
    default:
      throw Error('Unsupported platform');
  }
}
global.app = new Application({ path: appPath() })
