import fs from 'fs'
import path from 'path'

module.exports = async function testTeardown() {
  cleanTestUploadsFolder()
}

const cleanTestUploadsFolder = () => {
  try {
    fs.rmSync(path.resolve(__dirname, 'tmp', 'tests'), { recursive: true })
  } catch {}
}
