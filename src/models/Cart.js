import mongoose, { Schema } from 'mongoose'

const cartItemSchema = new Schema({
  product: { type: Schema.Types.ObjectId, ref: 'Product' },
  quantity: { type: Number, required: true },
  price: { type: Number, required: true },
  color: { type: [String], required: true },
})

const cartSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      unique: true,
    },
    items: { type: [cartItemSchema], default: [] },
  },
  { timestamps: true },
)

// cartSchema.set('toJSON', {
//   virtuals: true,
//   versionKey: false,
//   transform: function (_, ret) {
//     ret.id = ret._id.toString()
//     delete ret._id

//     if (Array.isArray(ret.items)) {
//       ret.items = ret.items.map((item) => {
//         item.id = item._id.toString()
//         delete item._id

//         if (item.product?._id) {
//           item.product.id = item.product._id.toString()
//           delete item.product._id
//         }
//         return item
//       })
//     }
//     return ret
//   },
// })
const Cart = mongoose.models.Cart || mongoose.model('Cart', cartSchema)
export default Cart
