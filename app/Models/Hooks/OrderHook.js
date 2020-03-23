'use strict'

const OrderHook = (exports = module.exports = {})

OrderHook.updateValues = async modelInstance => {
  modelInstance.$sideLoaded.subtotal = await modelInstance
    .items()
    .getSum('subtotal')

  modelInstance.$sideLoaded.qty_items = await modelInstance
    .items()
    .getSum('quantity')
  modelInstance.$sideLoaded.discount = await modelInstance
    .discounts()
    .getSum('discount')
  modelInstance.total =
    modelInstance.$sideLoaded.subtotal - modelInstance.$sideLoaded.discount
}

OrderHook.updateCollectionValues = async models => {
  models.forEach(async (model, index, arr) => {
    arr[index] = await OrderHook.updateValues(model)
  })

  // (let model of models) {
  //   model = await OrderHook.updateValues(model)
  // }
}
