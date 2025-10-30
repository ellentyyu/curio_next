import mongoose from 'mongoose'

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  image: { type: String, required: true },
  category: { type: String, required: true },
  gallery: { type: [String], required: false },
  tags: { type: [String], required: false },
  color: { type: [String], required: false },
  rating: { type: Number, required: true },
  reviewCount: { type: Number, required: true },
  inStock: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
})

const Product =
  mongoose.models.Product || mongoose.model('Product', productSchema)

export default Product
