'use strict'

const crypto = use('crypto')
// const Helpers = use('Helpers')

/**
 * Generate random string
 *
 * @param { int } lenght - O tamanho da string que você quer retornar
 * @return { string } - uma string randomica do tamanho de lenght
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

module.exports = { str_random }
