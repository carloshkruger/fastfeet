import {
  StorageProvider,
  FileInfo,
  DeleteFolderInfo,
  SaveFilesInfo,
  DeleteFilesInfo
} from './StorageProvider'

class FakeStorageProvider implements StorageProvider {
  private storage: string[] = []

  public async fileExists({ fileName, filePath }: FileInfo): Promise<boolean> {
    return !!this.storage.find(
      file => file === `${filePath.join('/')}${fileName}`
    )
  }

  public async saveFile({ fileName, filePath }: FileInfo): Promise<void> {
    this.storage.push(`${filePath.join('/')}${fileName}`)
  }

  public async saveFiles(data: SaveFilesInfo): Promise<void> {
    await Promise.all(
      data.fileNames.map(fileName =>
        this.saveFile({
          fileName,
          filePath: data.filePath
        })
      )
    )
  }

  public async deleteFile({ fileName, filePath }: FileInfo): Promise<void> {
    this.storage = this.storage.filter(
      file => file !== `${filePath.join('/')}${fileName}`
    )
  }

  public async deleteFiles(data: DeleteFilesInfo): Promise<void> {
    await Promise.all(
      data.fileNames.map(fileName =>
        this.deleteFile({
          fileName,
          filePath: data.filePath
        })
      )
    )
  }

  public async deleteFolder({ pathToFolder }: DeleteFolderInfo): Promise<void> {
    this.storage = this.storage.filter(
      data => !data.startsWith(pathToFolder.join('/'))
    )
  }
}

export { FakeStorageProvider }
