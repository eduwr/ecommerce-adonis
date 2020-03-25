'use strict'

const crypto = use('crypto')
const Helpers = use('Helpers')

/**
 * Generate random string
 *
 * @param { int } lenght - The string lenght
 * @return { string } - a random string with given lenght
 */

const str_random = async (length = 40) => {
  let string = ''
  const len = string.length

  if (len < length) {
    const size = length - len
    const bytes = await crypto.randomBytes(size)
    const buffer = Buffer.from(bytes)
    string += buffer
      .toString('base64')
      .replace(/[^a-zA-Z0-0]/g, '')
      .substr(0, size)

    return string
  }
}

/**
 * Move a single file to the specified path or 'public/uploads' by default.
 * @param { FileJar } file - the file to be managed.
 * @param { string } path - the destination path.
 * @return { Object<FileJar> }
 */

const manage_single_upload = async (file, path = null) => {
  path = path || Helpers.publicPath('uploads')

  // generate a random name
  const random_name = await str_random(30)
  const filename = `${new Date().getTime()}-${random_name}.${file.subtype}`

  // rename the file and move to destination path
  await file.move(path, {
    name: filename
  })

  return file
}

/**
 * Move multiple files to the specified path or 'public/uploads' by default.
 * @param { FileJar } fileJar
 * @param { string } path - the destination path.
 * @return { Object }
 */

const manage_multiple_uploads = async (fileJar, path = null) => {
  path = path || Helpers.publicPath('uploads')
  const successes = []
  const errors = []

  await Promise.all(
    fileJar.files.map(async file => {
      const random_name = await str_random(30)
      const filename = `${new Date().getTime()}-${random_name}.${file.subtype}`

      await file.move(path, { name: filename })

      if (file.moved()) {
        successes.push(file)
      } else {
        errors.push(file.error())
      }
    })
  )
  return { successes, error }
}

module.exports = { str_random, manage_single_upload, manage_multiple_uploads }
