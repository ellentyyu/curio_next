import { connectDB } from '@/lib/db'
import Product from '@/models/Product'
import { success, fail } from '@/lib/server/response'
import { unstable_cache } from 'next/cache'

const productsTest = [
  {
    id: 1,
    name: 'Make yourself useful notebook',
    description:
      'Not sure how to be useful? This notebook might just be the propeller that pushes you to become the most useful person in the world.',
    price: 100,
    image:
      'https://images.unsplash.com/photo-1625577379990-ed6457d8beb0?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    category: 'portable',
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
    name: 'Bestselling typewriter',
    description:
      'Not that the typewriter is the best seller, but the thing you write with it will be.',
    price: 42,
    image:
      'https://images.unsplash.com/photo-1752833102516-d810df87d1b9?q=80&w=1154&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    category: 'rituals',
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
      'https://images.unsplash.com/photo-1585327969772-17d7940f1a21?q=80&w=818&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    category: 'portable',
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
    name: 'Mushroom desk lamp',
    description:
      'Lamp that looks like a mushroom that you once ate in a forest and that tasted like a brownie',
    price: 55,
    image:
      'https://images.unsplash.com/photo-1680786707341-3997abf85091?q=80&w=735&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    category: 'rituals',
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
    name: 'Kerchief of minor importance',
    description:
      'Holds keys. Adds weight. Serves no deeper purpose, and is comfortable with that.',
    price: 12,
    image:
      'https://images.unsplash.com/photo-1655151867981-4b162982aab3?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    category: 'obsessions',
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
    name: 'Tent mug with coffee',
    description:
      "We don't know how the witchcraft of shipping is gonna do it, but the coffee is delivered to you wherever you are. Even to the tent you're camping in in the north pole.",
    price: 18,
    image:
      'https://images.unsplash.com/photo-1763616426659-6fcd6d0a9ac1?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    category: 'portable',
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
    name: 'Unreasonably versatile jar',
    description:
      'Light a candle in it. Put your pens in it. Grow a cactus in it. You name it.',
    price: 75,
    image:
      'https://images.unsplash.com/photo-1653478986313-bdbbecd74323?q=80&w=1171&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    category: 'obsessions',
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
      'https://images.unsplash.com/photo-1583496597521-a34048bdbfcd?q=80&w=1171&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    category: 'portable',
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
    name: 'Retro speaker',
    description:
      'Sits on your desk. Sings you to sleep. In the morning, at night, or during meetings.',
    price: 23,
    image:
      'https://images.unsplash.com/photo-1639689247459-939cc7b7181d?q=80&w=1169&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    category: 'obsessions',
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
      'https://images.unsplash.com/photo-1742976650166-f657fa5c26ed?q=80&w=880&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    category: 'rituals',
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
      'https://images.unsplash.com/photo-1711915506137-dd9e9b3488a1?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    category: 'portable',
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
    name: 'Record player',
    description:
      'A player that can play you new records like old ones and play old records like legends',
    price: 15,
    image:
      'https://images.unsplash.com/photo-1677519418984-a8e546fc70f2?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    category: 'rituals',
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
      'https://images.unsplash.com/photo-1570974774239-825ea88af94d?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    category: 'obsessions',
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
const serializeParams = (params) => {
  return JSON.stringify({
    category: params.category ?? null,
    price: params.price ?? null,
    color: params.color ?? null,
    tag: params.tag ?? null,
    sort: params.sort ?? null,
  })
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

export const getCachedProducts = unstable_cache(
  async (params) => {
    return getProducts(params)
  },
  (params) => ['products', serializeParams(params)],
  {
    revalidate: 60,
  },
)
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

// export async function getProductsCore(params) {
//   await connectDB()

//   const { category, price, color, tag } = params
//   const query = {}

//   if (category) query.category = category

//   price, color, tag...and other query logic

//   const products = await Product.find(query).lean()
//   return products.map(normalizeProduct)
// }
