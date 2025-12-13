import mongoose from 'mongoose'

const orderSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    items: [
      {
        productId: { type: String, required: true },
        name: { type: String, required: true },
        image: { type: String, required: true },
        color: { type: [String], default: [] },
        quantity: { type: Number, required: true },
        price: { type: Number, required: true },
      },
    ],
    shippingAddress: {
      email: { type: String, required: true },
      name: { type: String, required: true },
      address: { type: String, required: true },
      city: { type: String, required: true },
      state: { type: String, required: true },
      zip: { type: String, required: true },
      country: { type: String, required: true },
    },
    paymentMethod: { type: String, required: true },
    paymentStatus: { type: String, required: true },
    totalPrice: { type: Number, required: true },
  },
  { timestamps: true },
)

export default mongoose.models.Order || mongoose.model('Order', orderSchema)
