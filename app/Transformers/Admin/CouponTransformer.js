'use strict'

const BumblebeeTransformer = use('Bumblebee/Transformer')
const UserTransformer = use('App/Transformers/Admin/UserTransformer')
const ProductTransformer = use('App/Transformers/Admin/ProductTransformer')
const OrderTransformer = use('App/Transformers/Admin/OrderTransformer')

/**
 * CouponTransformer class
 *
 * @class CouponTransformer
 * @constructor
 */
class CouponTransformer extends BumblebeeTransformer {
  /**
   * This method is used to transform the data.
   */
  static get availableIncludes() {
    return ['users', 'products', 'orders']
  }

  transform(coupon) {
    coupon = coupon.toJSON()
    delete coupon.created_at
    delete coupon.updated_at
    return coupon
  }

  includeUsers(model) {
    return this.collection(model.getRelated('users'), UserTransformer)
  }

  includeProduct(model) {
    return this.collection(model.getRelated('product'), ProductTransformer)
  }

  includeOrders(model) {
    return this.collection(model.getRelated('orders'), OrderTransformer)
  }
}

module.exports = CouponTransformer
