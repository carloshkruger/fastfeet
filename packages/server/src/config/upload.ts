import path from 'path'

const tmpFolder = path.resolve(__dirname, '..', '..', 'tmp')
const uploadsFolder = path.resolve(tmpFolder, 'uploads')

export default {
  tmpFolder,
  uploadsFolder
}
