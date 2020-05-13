import path from 'path'
import { existsSync, mkdirSync, writeFileSync, readFileSync} from 'fs'
import { app } from 'electron'

export class Storage {
  constructor() {
    this.directory = path.join(app.getPath('userData'), 'storage')
    if (!existsSync(this.directory)) {
      mkdirSync(this.directory)
    }
  }

  get(key) {
    return this.read(key)
  }

  set(key, data) {
    return this.write(key, data)
  }

  read(key) {
    return JSON.parse(readFileSync(this.filepath(key)).toString('utf8'))
  }

  write(key, data) {
    return writeFileSync(this.filepath(key), JSON.stringify(data))
  }

  filepath(key) {
    const file = path.join(this.directory, `${key}.json`)
    if (!existsSync(file)) {
      writeFileSync(file, null, { flag: 'wx' })
    }
    return file
  }
}
