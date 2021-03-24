import fs from 'fs'
import path from 'path'
import uploadConfig from '@config/upload'
import { StorageProvider, FileInfo } from './StorageProvider'

class DiskStorageProvider implements StorageProvider {
  public async saveFile({ fileName, filePath }: FileInfo): Promise<void> {
    const origin = path.resolve(uploadConfig.tmpFolder, fileName)

    const destinationFolder = path.resolve(
      uploadConfig.uploadsFolder,
      ...filePath
    )

    const completeDestination = path.resolve(destinationFolder, fileName)

    await this.createDirectory(destinationFolder)

    await fs.promises.rename(origin, completeDestination)
  }

  public async deleteFile({ fileName, filePath }: FileInfo): Promise<void> {
    const completeFilePath = path.resolve(
      uploadConfig.uploadsFolder,
      ...filePath,
      fileName
    )

    try {
      await fs.promises.stat(completeFilePath)
    } catch {
      return
    }

    await fs.promises.unlink(completeFilePath)
  }

  public async createDirectory(path: string): Promise<void> {
    await fs.promises.mkdir(path, { recursive: true })
  }
}

export default DiskStorageProvider
