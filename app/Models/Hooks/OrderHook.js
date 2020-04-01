'use strict'

const OrderHook = (exports = module.exports = {})

OrderHook.updateValues = async model => {
  model.$sideLoaded.subtotal = await model.items().getSum('subtotal')
  model.$sideLoaded.qty_items = await model.items().getSum('quantity')
  model.$sideLoaded.discount = await model.discounts().getSum('discount')
  model.total = model.$sideLoaded.subtotal - model.$sideLoaded.discount
}

OrderHook.updateCollectionValues = async models => {
  models.forEach(async (model, index, arr) => {
    arr[index] = await OrderHook.updateValues(model)
  })

  // (let model of models) {
  //   model = await OrderHook.updateValues(model)
  // }
}
