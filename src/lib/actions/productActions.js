import { connectDB } from '@/lib/db'
import Product from '@/models/Product'
import { success, fail } from '@/lib/response'
// const productsTest = [
//   {
//     id: 1,
//     name: 'Make yourself useful notebook',
//     description:
//       'Make yourself useful notebook with a beautiful design and a lot of features',
//     price: 100,
//     image:
//       'https://tailwindcss.com/plus-assets/img/ecommerce-images/category-page-05-image-card-08.jpg',
//     category: 'workspace',
//     gallery: [
//       'https://tailwindcss.com/plus-assets/img/ecommerce-images/category-page-05-image-card-08.jpg',
//       'https://tailwindcss.com/plus-assets/img/ecommerce-images/category-page-05-image-card-09.jpg',
//     ],
//     tags: ['new', 'sale', 'featured'],
//     color: ['beige', 'black'],
//     rating: 4.5,
//     reviewCount: 100,
//     inStock: 10,
//     createdAt: new Date(),
//     updatedAt: new Date(),
//   },
//   {
//     id: 234,
//     name: 'Keychaaaaiiinn (Black)',
//     description:
//       'Keychaaaaiiinn (Black) with a beautiful design and a lot of features',
//     price: 199,
//     image:
//       'https://tailwindcss.com/plus-assets/img/ecommerce-images/category-page-05-image-card-09.jpg',
//     category: 'accessories',
//     gallery: [
//       'https://tailwindcss.com/plus-assets/img/ecommerce-images/category-page-05-image-card-09.jpg',
//       'https://tailwindcss.com/plus-assets/img/ecommerce-images/category-page-05-image-card-08.jpg',
//     ],
//     tags: ['new', 'sale', 'featured'],
//     color: ['beige', 'pink'],
//     rating: 4.5,
//     reviewCount: 100,
//     inStock: 10,
//     createdAt: new Date(),
//     updatedAt: new Date(Date.now() + 1000 * 60 * 60 * 24),
//   },
//   {
//     id: 345,
//     name: 'Out and About Bottle',
//     description:
//       'Out and About Bottle with a beautiful design and a lot of features',
//     price: 299,
//     image:
//       'https://tailwindcss.com/plus-assets/img/ecommerce-images/category-page-05-image-card-07.jpg',
//     category: 'travel',
//     gallery: [
//       'https://tailwindcss.com/plus-assets/img/ecommerce-images/category-page-05-image-card-07.jpg',
//       'https://tailwindcss.com/plus-assets/img/ecommerce-images/category-page-05-image-card-06.jpg',
//     ],
//     tags: ['new', 'objects', 'featured'],
//     color: ['purple', 'white'],
//     rating: 4.5,
//     reviewCount: 100,
//     inStock: 10,
//     createdAt: new Date(),
//     updatedAt: new Date(),
//   },
//   {
//     id: 456,
//     name: 'another travel product',
//     description:
//       'another travel product with a beautiful design and a lot of features',
//     price: 9,
//     image:
//       'https://tailwindcss.com/plus-assets/img/ecommerce-images/category-page-05-image-card-06.jpg',
//     category: 'travel',
//     gallery: [
//       'https://tailwindcss.com/plus-assets/img/ecommerce-images/category-page-05-image-card-06.jpg',
//       'https://tailwindcss.com/plus-assets/img/ecommerce-images/category-page-05-image-card-05.jpg',
//     ],
//     tags: ['new', 'sale', 'tees'],
//     color: ['blue', 'green'],
//     rating: 4.5,
//     reviewCount: 100,
//     inStock: 10,
//     createdAt: new Date(),
//     updatedAt: new Date(),
//   },
// ]
const productsTest = [
  {
    id: 1,
    name: 'Make yourself useful notebook',
    description:
      'Make yourself useful notebook with a beautiful design and a lot of features',
    price: 100,
    image:
      'https://tailwindcss.com/plus-assets/img/ecommerce-images/category-page-05-image-card-08.jpg',
    category: 'portable lives',
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
    id: 2,
    name: 'Desk thoughts tray',
    description:
      'A shallow tray for unfinished ideas, loose screws, and the kind of objects you swear you will organize later.',
    price: 42,
    image:
      'https://tailwindcss.com/plus-assets/img/ecommerce-images/category-page-05-image-card-08.jpg',
    category: 'desk rituals',
    gallery: [
      'https://tailwindcss.com/plus-assets/img/ecommerce-images/category-page-05-image-card-08.jpg',
    ],
    tags: ['featured'],
    color: ['black', 'purple'],
    rating: 3.8,
    reviewCount: 17,
    inStock: 4,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 3,
    name: 'Pocket-sized existential planner',
    description:
      'Small enough to carry everywhere, large enough to remind you that plans are mostly suggestions.',
    price: 29,
    image:
      'https://tailwindcss.com/plus-assets/img/ecommerce-images/category-page-05-image-card-08.jpg',
    category: 'portable lives',
    gallery: [
      'https://tailwindcss.com/plus-assets/img/ecommerce-images/category-page-05-image-card-08.jpg',
    ],
    tags: [],
    color: ['pink'],
    rating: 4.9,
    reviewCount: 3,
    inStock: 0,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 4,
    name: 'Cable management cube (optimistic)',
    description:
      'Designed to suggest order, even if the cables inside remain emotionally unmanageable.',
    price: 55,
    image:
      'https://tailwindcss.com/plus-assets/img/ecommerce-images/category-page-05-image-card-08.jpg',
    category: 'desk rituals',
    gallery: [
      'https://tailwindcss.com/plus-assets/img/ecommerce-images/category-page-05-image-card-08.jpg',
    ],
    tags: ['sale'],
    color: ['beige', 'turquoise'],
    rating: 2.6,
    reviewCount: 241,
    inStock: 7,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 5,
    name: 'Keychain of minor importance',
    description:
      'Holds keys. Adds weight. Serves no deeper purpose, and is comfortable with that.',
    price: 12,
    image:
      'https://tailwindcss.com/plus-assets/img/ecommerce-images/category-page-05-image-card-08.jpg',
    category: 'small obsessions',
    gallery: [
      'https://tailwindcss.com/plus-assets/img/ecommerce-images/category-page-05-image-card-08.jpg',
    ],
    tags: ['new'],
    color: [],
    rating: 4.1,
    reviewCount: 89,
    inStock: 10,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 6,
    name: 'Notebook for lists you will not finish',
    description:
      'Pages specifically engineered to remain half-used, dog-eared, and quietly abandoned.',
    price: 18,
    image:
      'https://tailwindcss.com/plus-assets/img/ecommerce-images/category-page-05-image-card-08.jpg',
    category: 'portable lives',
    gallery: [
      'https://tailwindcss.com/plus-assets/img/ecommerce-images/category-page-05-image-card-08.jpg',
    ],
    tags: ['featured'],
    color: ['unicorn'],
    rating: 5,
    reviewCount: 1,
    inStock: 2,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 7,
    name: 'Unreasonably nice pen',
    description:
      'Writes smoothly, looks serious, and makes even bad handwriting feel intentional.',
    price: 75,
    image:
      'https://tailwindcss.com/plus-assets/img/ecommerce-images/category-page-05-image-card-08.jpg',
    category: 'small obsessions',
    gallery: [
      'https://tailwindcss.com/plus-assets/img/ecommerce-images/category-page-05-image-card-08.jpg',
    ],
    tags: ['new', 'featured'],
    color: ['black'],
    rating: 4.7,
    reviewCount: 512,
    inStock: 6,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 8,
    name: 'Travel pouch for unknown purposes',
    description:
      'Fits chargers, receipts, regrets, and at least one object you forgot packing.',
    price: 64,
    image:
      'https://tailwindcss.com/plus-assets/img/ecommerce-images/category-page-05-image-card-08.jpg',
    category: 'portable lives',
    gallery: [
      'https://tailwindcss.com/plus-assets/img/ecommerce-images/category-page-05-image-card-08.jpg',
    ],
    tags: [],
    color: ['beige', 'pink'],
    rating: 3.2,
    reviewCount: 44,
    inStock: 1,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 9,
    name: 'Object you keep touching absentmindedly',
    description:
      'Sits on your desk. Does nothing. Somehow ends up in your hand during meetings.',
    price: 23,
    image:
      'https://tailwindcss.com/plus-assets/img/ecommerce-images/category-page-05-image-card-08.jpg',
    category: 'small obsessions',
    gallery: [
      'https://tailwindcss.com/plus-assets/img/ecommerce-images/category-page-05-image-card-08.jpg',
    ],
    tags: ['sale'],
    color: ['purple', 'unicorn'],
    rating: 1.9,
    reviewCount: 7,
    inStock: 0,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 10,
    name: 'Desk clock that judges you silently',
    description:
      'Tells time accurately while reminding you that it is, in fact, passing.',
    price: 88,
    image:
      'https://tailwindcss.com/plus-assets/img/ecommerce-images/category-page-05-image-card-08.jpg',
    category: 'desk rituals',
    gallery: [
      'https://tailwindcss.com/plus-assets/img/ecommerce-images/category-page-05-image-card-08.jpg',
    ],
    tags: ['featured'],
    color: ['black'],
    rating: 4.0,
    reviewCount: 203,
    inStock: 8,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 11,
    name: 'Minimal wallet with maximal confidence',
    description:
      'Holds fewer cards than you think you need, and somehow that feels like progress.',
    price: 120,
    image:
      'https://tailwindcss.com/plus-assets/img/ecommerce-images/category-page-05-image-card-08.jpg',
    category: 'portable lives',
    gallery: [
      'https://tailwindcss.com/plus-assets/img/ecommerce-images/category-page-05-image-card-08.jpg',
    ],
    tags: ['new'],
    color: ['beige'],
    rating: 4.4,
    reviewCount: 61,
    inStock: 5,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 12,
    name: 'Tiny box for very important nothing',
    description:
      'A container whose main function is to make small, meaningless items feel significant.',
    price: 15,
    image:
      'https://tailwindcss.com/plus-assets/img/ecommerce-images/category-page-05-image-card-08.jpg',
    category: 'desk rituals',
    gallery: [
      'https://tailwindcss.com/plus-assets/img/ecommerce-images/category-page-05-image-card-08.jpg',
    ],
    tags: [],
    color: [],
    rating: 2.1,
    reviewCount: 0,
    inStock: 9,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 13,
    name: 'Accessory you defend when questioned',
    description:
      'Hard to explain, easy to keep, and strangely personal for something so small.',
    price: 47,
    image:
      'https://tailwindcss.com/plus-assets/img/ecommerce-images/category-page-05-image-card-08.jpg',
    category: 'small obsessions',
    gallery: [
      'https://tailwindcss.com/plus-assets/img/ecommerce-images/category-page-05-image-card-08.jpg',
    ],
    tags: ['sale', 'featured'],
    color: ['turquoise', 'pink'],
    rating: 3.5,
    reviewCount: 138,
    inStock: 3,
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
      const ranges = price.split(',')

      const priceConditions = ranges.map((range) => {
        if (range.endsWith('+')) {
          const min = Number(range.replace('+', ''))
          return { price: { $gte: min } }
        }

        const [min, max] = range.split('-').map(Number)
        return { price: { $gte: min, $lt: max } }
      })

      query.$or = priceConditions
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
