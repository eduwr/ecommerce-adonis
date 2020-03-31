'use strict'

const BumblebeeTransformer = use('Bumblebee/Transformer')

/**
 * ImageTransformer class
 *
 * @class ImageTransformer
 * @constructor
 */
class ImageTransformer extends BumblebeeTransformer {
  /**
   * This method is used to transform the data.
   */
  transform(image) {
    image = image.toJSON()
    const { id, url, size, original_name, extension } = image
    return {
      // add your transformation object here
      id,
      url,
      size,
      original_name,
      extension
    }
  }
}

module.exports = ImageTransformer
