interface FileInfo {
  fileName: string
  filePath: string[]
}

interface StorageProvider {
  saveFile(data: FileInfo): Promise<void>
  deleteFile(data: FileInfo): Promise<void>
}

export { StorageProvider, FileInfo }
