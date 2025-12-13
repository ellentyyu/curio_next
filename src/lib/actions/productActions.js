import { connectDB } from '@/lib/db'
import Product from '@/models/Product'
import { success, fail } from '@/lib/response'
const productsTest = [
  {
    id: 1,
    name: 'Make yourself useful notebook',
    description:
      'Make yourself useful notebook with a beautiful design and a lot of features',
    price: 100,
    image:
      'https://tailwindcss.com/plus-assets/img/ecommerce-images/category-page-05-image-card-08.jpg',
    category: 'workspace',
    gallery: [
      'https://tailwindcss.com/plus-assets/img/ecommerce-images/category-page-05-image-card-08.jpg',
      'https://tailwindcss.com/plus-assets/img/ecommerce-images/category-page-05-image-card-09.jpg',
    ],
    tags: ['new', 'sale', 'featured'],
    color: ['beige', 'black'],
    rating: 4.5,
    reviewCount: 100,
    inStock: 10,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 234,
    name: 'Keychaaaaiiinn (Black)',
    description:
      'Keychaaaaiiinn (Black) with a beautiful design and a lot of features',
    price: 199,
    image:
      'https://tailwindcss.com/plus-assets/img/ecommerce-images/category-page-05-image-card-09.jpg',
    category: 'accessories',
    gallery: [
      'https://tailwindcss.com/plus-assets/img/ecommerce-images/category-page-05-image-card-09.jpg',
      'https://tailwindcss.com/plus-assets/img/ecommerce-images/category-page-05-image-card-08.jpg',
    ],
    tags: ['new', 'sale', 'featured'],
    color: ['beige', 'pink'],
    rating: 4.5,
    reviewCount: 100,
    inStock: 10,
    createdAt: new Date(),
    updatedAt: new Date(Date.now() + 1000 * 60 * 60 * 24),
  },
  {
    id: 345,
    name: 'Out and About Bottle',
    description:
      'Out and About Bottle with a beautiful design and a lot of features',
    price: 299,
    image:
      'https://tailwindcss.com/plus-assets/img/ecommerce-images/category-page-05-image-card-07.jpg',
    category: 'travel',
    gallery: [
      'https://tailwindcss.com/plus-assets/img/ecommerce-images/category-page-05-image-card-07.jpg',
      'https://tailwindcss.com/plus-assets/img/ecommerce-images/category-page-05-image-card-06.jpg',
    ],
    tags: ['new', 'objects', 'featured'],
    color: ['purple', 'white'],
    rating: 4.5,
    reviewCount: 100,
    inStock: 10,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 456,
    name: 'another travel product',
    description:
      'another travel product with a beautiful design and a lot of features',
    price: 9,
    image:
      'https://tailwindcss.com/plus-assets/img/ecommerce-images/category-page-05-image-card-06.jpg',
    category: 'travel',
    gallery: [
      'https://tailwindcss.com/plus-assets/img/ecommerce-images/category-page-05-image-card-06.jpg',
      'https://tailwindcss.com/plus-assets/img/ecommerce-images/category-page-05-image-card-05.jpg',
    ],
    tags: ['new', 'sale', 'tees'],
    color: ['blue', 'green'],
    rating: 4.5,
    reviewCount: 100,
    inStock: 10,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
]
export const seedProducts = async () => {
  await connectDB()
  await Product.insertMany(productsTest)
}
const normalizeProduct = (product) => ({
  id: product._id.toString(),
  name: product.name,
  price: product.price,
  image: product.image ?? null,
  category: product.category,
  color: product.color ?? [],
  tags: product.tags ?? [],
  inStock: product.inStock ?? false,
  description: product.description ?? '',
  createdAt: product.createdAt,
})
export const getProducts = async (params) => {
  try {
    await connectDB()
    const { category, price, color, tag, sort } = params
    // Build query object
    const query = {}

    // Filter by category
    if (category) {
      query.category = category
    }

    // Filter by price
    if (price) {
      const selectedPrice = price.split(',').map(Number)
      query.price = { $gte: Math.min(...selectedPrice) }
    }

    // Filter by color
    if (color) {
      query.color = { $in: color.split(',') }
    }

    // Filter by tag
    if (tag) {
      query.tags = { $in: tag.split(',') }
    }

    // Build sort object
    let sortObj = {}
    if (sort) {
      if (sort === 'newest') {
        sortObj = { createdAt: -1 }
      } else if (sort === 'price-asc') {
        sortObj = { price: 1 }
      } else if (sort === 'price-desc') {
        sortObj = { price: -1 }
      }
    }

    // Execute query
    const products = await Product.find(query).sort(sortObj).lean()
    const parsedProducts = products.map(normalizeProduct)

    return success(200, { products: parsedProducts })
  } catch (error) {
    console.error('get products error', error)
    return fail(500, 'get products failed')
  }
}

export const getProductById = async (id) => {
  try {
    await connectDB()

    const product = await Product.findById(id).lean()
    if (!product) {
      return fail(404, 'product not found')
    }
    return success(200, { product: normalizeProduct(product) })
  } catch (error) {
    console.error('get product by id error', error)
    return fail(500, 'get product by id failed')
  }
}
