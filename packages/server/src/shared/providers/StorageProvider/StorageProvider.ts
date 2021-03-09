interface FileInfo {
  fileName: string
  filePath: string[]
}

interface DeleteFolderInfo {
  pathToFolder: string[]
}

interface SaveFilesInfo {
  fileNames: string[]
  filePath: string[]
}

interface DeleteFilesInfo {
  fileNames: string[]
  filePath: string[]
}

interface StorageProvider {
  fileExists(data: FileInfo): Promise<boolean>
  saveFile(data: FileInfo): Promise<void>
  saveFiles(data: SaveFilesInfo): Promise<void>
  deleteFile(data: FileInfo): Promise<void>
  deleteFiles(data: DeleteFilesInfo): Promise<void>
  deleteFolder(data: DeleteFolderInfo): Promise<void>
}

export {
  StorageProvider,
  FileInfo,
  DeleteFolderInfo,
  SaveFilesInfo,
  DeleteFilesInfo
}
