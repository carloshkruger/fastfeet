import multer from 'multer'
import { v4 } from 'uuid'
import uploadConfig from '@config/upload'

export default multer({
  storage: multer.diskStorage({
    destination: uploadConfig.tmpFolder,
    filename(request, file, callback) {
      const fileNameArray = file.originalname.split('.')
      const fileExtension = fileNameArray.pop()
      const uuid = v4()
      const fileName = `${uuid}.${fileExtension}`

      return callback(null, fileName)
    }
  })
})
