import Link from 'next/link'
import { getProducts } from '@/lib/actions/productActions'
import Image from 'next/image'
export default async function ProductGrid({
  category,
  price,
  color,
  tag,
  sort,
}) {
  const result = await getProducts({ category, price, color, tag, sort })
  if (!result.success) {
    return <div>Error: {result.message}</div>
  }
  const products = result.data.products
  const testProduct = [
    // {
    //   id: 4536,
    //   name: 'another travel product',
    //   description:
    //     'another travel product with a beautiful design and a lot of features',
    //   price: 9,
    //   image:
    //     'https://images.unsplash.com/photo-1639689247459-939cc7b7181d?q=80&w=1169&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    //   category: 'travel',
    //   gallery: [
    //     'https://tailwindcss.com/plus-assets/img/ecommerce-images/category-page-05-image-card-06.jpg',
    //     'https://tailwindcss.com/plus-assets/img/ecommerce-images/category-page-05-image-card-05.jpg',
    //   ],
    //   tags: ['new', 'sale', 'tees'],
    //   color: ['blue', 'green'],
    //   rating: 4.5,
    //   reviewCount: 100,
    //   inStock: 10,
    //   createdAt: new Date(),
    //   updatedAt: new Date(),
    // },
    // {
    //   id: 45336,
    //   name: 'another travel product',
    //   description:
    //     'another travel product with a beautiful design and a lot of features',
    //   price: 9,
    //   image:
    //     'https://images.unsplash.com/photo-1677519418984-a8e546fc70f2?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    //   category: 'travel',
    //   gallery: [
    //     'https://tailwindcss.com/plus-assets/img/ecommerce-images/category-page-05-image-card-06.jpg',
    //     'https://tailwindcss.com/plus-assets/img/ecommerce-images/category-page-05-image-card-05.jpg',
    //   ],
    //   tags: ['new', 'sale', 'tees'],
    //   color: ['blue', 'green'],
    //   rating: 4.5,
    //   reviewCount: 100,
    //   inStock: 10,
    //   createdAt: new Date(),
    //   updatedAt: new Date(),
    // },
    // {
    //   id: 45337,
    //   name: 'another travel product',
    //   description:
    //     'another travel product with a beautiful design and a lot of features',
    //   price: 9,
    //   image:
    //     'https://images.unsplash.com/photo-1597072699035-689b6685fc12?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    //   category: 'travel',
    //   gallery: [
    //     'https://tailwindcss.com/plus-assets/img/ecommerce-images/category-page-05-image-card-06.jpg',
    //     'https://tailwindcss.com/plus-assets/img/ecommerce-images/category-page-05-image-card-05.jpg',
    //   ],
    //   tags: ['new', 'sale', 'tees'],
    //   color: ['blue', 'green'],
    //   rating: 4.5,
    //   reviewCount: 100,
    //   inStock: 10,
    //   createdAt: new Date(),
    //   updatedAt: new Date(),
    // },
    // {
    //   id: 45338,
    //   name: 'another travel product',
    //   description:
    //     'another travel product with a beautiful design and a lot of features',
    //   price: 9,
    //   image:
    //     'https://images.unsplash.com/photo-1659756347307-ce034f011a27?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    //   category: 'travel',
    //   gallery: [
    //     'https://tailwindcss.com/plus-assets/img/ecommerce-images/category-page-05-image-card-06.jpg',
    //     'https://tailwindcss.com/plus-assets/img/ecommerce-images/category-page-05-image-card-05.jpg',
    //   ],
    //   tags: ['new', 'sale', 'tees'],
    //   color: ['blue', 'green'],
    //   rating: 4.5,
    //   reviewCount: 100,
    //   inStock: 10,
    //   createdAt: new Date(),
    //   updatedAt: new Date(),
    // },
    // {
    //   id: 45339,
    //   name: 'another travel product',
    //   description:
    //     'another travel product with a beautiful design and a lot of features',
    //   price: 9,
    //   image:
    //     'https://images.unsplash.com/photo-1591097012594-68f00282785b?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    //   category: 'travel',
    //   gallery: [
    //     'https://tailwindcss.com/plus-assets/img/ecommerce-images/category-page-05-image-card-06.jpg',
    //     'https://tailwindcss.com/plus-assets/img/ecommerce-images/category-page-05-image-card-05.jpg',
    //   ],
    //   tags: ['new', 'sale', 'tees'],
    //   color: ['blue', 'green'],
    //   rating: 4.5,
    //   reviewCount: 100,
    //   inStock: 10,
    //   createdAt: new Date(),
    //   updatedAt: new Date(),
    // },
    // {
    //   id: 453332,
    //   name: 'another travel product',
    //   description:
    //     'another travel product with a beautiful design and a lot of features',
    //   price: 9,
    //   image:
    //     'https://images.unsplash.com/photo-1596030155649-037382550316?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    //   category: 'travel',
    //   gallery: [
    //     'https://tailwindcss.com/plus-assets/img/ecommerce-images/category-page-05-image-card-06.jpg',
    //     'https://tailwindcss.com/plus-assets/img/ecommerce-images/category-page-05-image-card-05.jpg',
    //   ],
    //   tags: ['new', 'sale', 'tees'],
    //   color: ['blue', 'green'],
    //   rating: 4.5,
    //   reviewCount: 100,
    //   inStock: 10,
    //   createdAt: new Date(),
    //   updatedAt: new Date(),
    // },
    // {
    //   id: 4532332,
    //   name: 'another travel product',
    //   description:
    //     'another travel product with a beautiful design and a lot of features',
    //   price: 9,
    //   image:
    //     'https://images.unsplash.com/photo-1703669059784-b40068f30c0c?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fHJhZGlvfGVufDB8fDB8fHww',
    //   category: 'travel',
    //   gallery: [
    //     'https://tailwindcss.com/plus-assets/img/ecommerce-images/category-page-05-image-card-06.jpg',
    //     'https://tailwindcss.com/plus-assets/img/ecommerce-images/category-page-05-image-card-05.jpg',
    //   ],
    //   tags: ['new', 'sale', 'tees'],
    //   color: ['blue', 'green'],
    //   rating: 4.5,
    //   reviewCount: 100,
    //   inStock: 10,
    //   createdAt: new Date(),
    //   updatedAt: new Date(),
    // },
    // {
    //   id: 4532333,
    //   name: 'another travel product',
    //   description:
    //     'another travel product with a beautiful design and a lot of features',
    //   price: 9,
    //   image:
    //     'https://images.unsplash.com/flagged/photo-1552331619-7f97d9a4c9c6?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    //   category: 'travel',
    //   gallery: [
    //     'https://tailwindcss.com/plus-assets/img/ecommerce-images/category-page-05-image-card-06.jpg',
    //     'https://tailwindcss.com/plus-assets/img/ecommerce-images/category-page-05-image-card-05.jpg',
    //   ],
    //   tags: ['new', 'sale', 'tees'],
    //   color: ['blue', 'green'],
    //   rating: 4.5,
    //   reviewCount: 100,
    //   inStock: 10,
    //   createdAt: new Date(),
    //   updatedAt: new Date(),
    // },
  ]

  return (
    <section
      aria-labelledby="products-heading"
      className="mx-auto max-w-2xl lg:max-w-7xl"
    >
      <h2 className="sr-only">Products</h2>

      {products.length > 0 ? (
        <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => (
            <Link
              key={product.id}
              href={`/product/${product.id}`}
              className="group"
            >
              <Image
                width={350}
                height={350}
                alt={product.name}
                src={product.image}
                className="aspect-square w-full rounded-lg bg-gray-200 object-cover group-hover:opacity-75 xl:aspect-7/8"
              />
              <h3 className="mt-4 text-sm text-gray-700">{product.name}</h3>
              <p className="mt-1 text-lg font-medium text-gray-900">
                {product.price}
              </p>
            </Link>
          ))}
        </div>
      ) : (
        <div className="text-center text-gray-500">No products found</div>
      )}
    </section>
  )
}
