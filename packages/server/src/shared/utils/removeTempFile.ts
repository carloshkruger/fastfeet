import fs from 'fs'
import path from 'path'

import uploadConfig from '@config/upload'
import { isEmpty } from './String'

export const removeTempFile = async (fileName: string) => {
  try {
    if (isEmpty(fileName)) {
      return
    }

    const filePath = path.resolve(uploadConfig.tmpFolder, fileName)

    await fs.promises.unlink(filePath)
  } catch {}
}
