import { isTestEnvironment } from '@shared/utils/isTestEnvironment'
import path from 'path'

const tmpFolder = path.resolve(__dirname, '..', '..', 'tmp')
const uploadsFolder = isTestEnvironment()
  ? path.resolve(tmpFolder, 'tests', 'uploads')
  : path.resolve(tmpFolder, 'uploads')

export default {
  tmpFolder,
  uploadsFolder
}
