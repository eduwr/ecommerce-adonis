'use strict'

const BumblebeeTransformer = use('Bumblebee/Transformer')
const CouponTransformer = use('App/Transformers/Admin/CouponTransformer')

/**
 * DiscountTransformer class
 *
 * @class DiscountTransformer
 * @constructor
 */
class DiscountTransformer extends BumblebeeTransformer {
  /**
   * This method is used to transform the data.
   */
  static get defaultInclude() {
    return ['coupon']
  }

  transform(model) {
    return {
      id: model.id,
      amount: model.discount
    }
  }

  includeCoupon(model) {
    return this.item(model.getRelated('coupon'), CouponTransformer)
  }
}

module.exports = DiscountTransformer
