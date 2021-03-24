import { StorageProvider, FileInfo } from './StorageProvider'

class FakeStorageProvider implements StorageProvider {
  private storage: string[] = []

  public async saveFile({ fileName, filePath }: FileInfo): Promise<void> {
    this.storage.push(`${filePath.join('/')}${fileName}`)
  }

  public async deleteFile({ fileName, filePath }: FileInfo): Promise<void> {
    this.storage = this.storage.filter(
      file => file !== `${filePath.join('/')}${fileName}`
    )
  }
}

export { FakeStorageProvider }
