import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  Popover,
  PopoverButton,
  PopoverGroup,
  PopoverPanel,
  Tab,
  TabGroup,
  TabList,
  TabPanel,
  TabPanels,
} from '@headlessui/react'
import {
  Bars3Icon,
  MagnifyingGlassIcon,
  ShieldCheckIcon,
  ShoppingBagIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline'
import {
  CheckCircleIcon,
  CheckIcon,
  QuestionMarkCircleIcon,
  StarIcon,
} from '@heroicons/react/20/solid'
import Image from 'next/image'
import Link from 'next/link'
import { getProductDetails } from '@/lib/mock-data/products'

const reviews = {
  average: 4,
  totalCount: 1624,
  counts: [
    { rating: 5, count: 1019 },
    { rating: 4, count: 162 },
    { rating: 3, count: 97 },
    { rating: 2, count: 199 },
    { rating: 1, count: 147 },
  ],
  featured: [
    {
      id: 1,
      rating: 5,
      content: `
        <p>This is the bag of my dreams. I took it on my last vacation and was able to fit an absurd amount of snacks for the many long and hungry flights.</p>
      `,
      author: 'Emily Selman',
      avatarSrc:
        'https://images.unsplash.com/photo-1502685104226-ee32379fefbe?ixlib=rb-=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=256&h=256&q=80',
    },
    {
      id: 2,
      rating: 5,
      content: `
        <p>Before getting the Ruck Snack, I struggled my whole life with pulverized snacks, endless crumbs, and other heartbreaking snack catastrophes. Now, I can stow my snacks with confidence and style!</p>
      `,
      author: 'Hector Gibbons',
      avatarSrc:
        'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=256&h=256&q=80',
    },
    {
      id: 3,
      rating: 4,
      content: `
        <p>I love how versatile this bag is. It can hold anything ranging from cookies that come in trays to cookies that come in tins.</p>
      `,
      author: 'Mark Edwards',
      avatarSrc:
        'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixqx=oilqXxSqey&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
  ],
}

const incentives = [
  {
    name: 'Free shipping',
    imageSrc:
      'https://tailwindcss.com/plus-assets/img/ecommerce/icons/icon-shipping-simple.svg',
    description:
      "It's not actually free we just price it into the products. Someone's paying for it, and it's not us.",
  },
  {
    name: '10-year warranty',
    imageSrc:
      'https://tailwindcss.com/plus-assets/img/ecommerce/icons/icon-warranty-simple.svg',
    description:
      "If it breaks in the first 10 years we'll replace it. After that you're on your own though.",
  },
  {
    name: 'Exchanges',
    imageSrc:
      'https://tailwindcss.com/plus-assets/img/ecommerce/icons/icon-exchange-simple.svg',
    description:
      "If you don't like it, trade it to one of your friends for something of theirs. Don't send it here though.",
  },
]
function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default async function ProductDetailPage({ params }) {
  const { id } = await params
  const product = await getProductDetails(id)
  return (
    <div className="bg-gray-50">
      <main>
        {/* Product */}
        <div className="bg-white">
          <div className="mx-auto max-w-2xl px-4 pt-16 pb-24 sm:px-6 sm:pt-24 sm:pb-32 lg:grid lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8">
            {/* Product details */}
            <div className="lg:max-w-lg lg:self-end">
              <Link href={`/products?category=${product.category}`}>
                <span className="text-sm text-gray-500">
                  {product.category}
                </span>
              </Link>

              <div className="mt-4">
                <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                  {product.name}
                </h1>
              </div>

              <section aria-labelledby="information-heading" className="mt-4">
                <h2 id="information-heading" className="sr-only">
                  Product information
                </h2>

                <div className="flex items-center">
                  <p className="text-lg text-gray-900 sm:text-xl">
                    {product.price}
                  </p>

                  <div className="ml-4 border-l border-gray-300 pl-4">
                    <h2 className="sr-only">Reviews</h2>
                    <div className="flex items-center">
                      <div>
                        <div className="flex items-center">
                          {[0, 1, 2, 3, 4].map((rating) => (
                            <StarIcon
                              key={rating}
                              aria-hidden="true"
                              className={classNames(
                                reviews.average > rating
                                  ? 'text-yellow-400'
                                  : 'text-gray-300',
                                'size-5 shrink-0',
                              )}
                            />
                          ))}
                        </div>
                        <p className="sr-only">
                          {reviews.average} out of 5 stars
                        </p>
                      </div>
                      <p className="ml-2 text-sm text-gray-500">
                        {reviews.totalCount} reviews
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-4 space-y-6">
                  <p className="text-base text-gray-500">
                    {product.description}
                  </p>
                </div>

                <div className="mt-6 flex items-center">
                  <CheckIcon
                    aria-hidden="true"
                    className="size-5 shrink-0 text-green-500"
                  />
                  <p className="ml-2 text-sm text-gray-500">
                    In stock and ready to ship
                  </p>
                </div>
              </section>
            </div>

            {/* Product image */}
            <div className="mt-10 lg:col-start-2 lg:row-span-2 lg:mt-0 lg:self-center">
              <Image
                width={600}
                height={600}
                alt={product.name}
                src={product.image}
                className="aspect-square w-full rounded-lg object-cover"
              />
            </div>

            {/* Product form */}
            <div className="mt-10 lg:col-start-1 lg:row-start-2 lg:max-w-lg lg:self-start">
              <section aria-labelledby="options-heading">
                <h2 id="options-heading" className="sr-only">
                  Product options
                </h2>

                <form>
                  {/* size */}
                  {/* <div className="sm:flex sm:justify-between">
                
                    <fieldset>
                      <legend className="block text-sm font-medium text-gray-700">
                        Size
                      </legend>
                      <div className="mt-1 grid grid-cols-1 gap-4 sm:grid-cols-2">
                        {product.sizes.map((size) => (
                          <label
                            key={size.name}
                            aria-label={size.name}
                            aria-description={size.description}
                            className="group relative flex rounded-lg border border-gray-300 bg-white p-4 has-checked:outline-2 has-checked:-outline-offset-2 has-checked:outline-indigo-600 has-focus-visible:outline-3 has-focus-visible:-outline-offset-1 has-disabled:border-gray-400 has-disabled:bg-gray-200 has-disabled:opacity-25"
                          >
                            <input
                              defaultValue={size.name}
                              defaultChecked={size === product.sizes[0]}
                              name="size"
                              type="radio"
                              className="absolute inset-0 appearance-none focus:outline-none"
                            />
                            <div className="flex-1">
                              <span className="block text-base font-medium text-gray-900">
                                {size.name}
                              </span>
                              <span className="mt-1 block text-sm text-gray-500">
                                {size.description}
                              </span>
                            </div>
                            <CheckCircleIcon
                              aria-hidden="true"
                              className="invisible size-5 text-indigo-600 group-has-checked:visible"
                            />
                          </label>
                        ))}
                      </div>
                    </fieldset>
                  </div> */}
                  <div className="">
                    <button
                      type="submit"
                      className="flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50 focus:outline-hidden"
                    >
                      Add to bag
                    </button>
                  </div>
                  {/* <div className="mt-6 text-center">
                    <a
                      href="#"
                      className="group inline-flex text-base font-medium"
                    >
                      <ShieldCheckIcon
                        aria-hidden="true"
                        className="mr-2 size-6 shrink-0 text-gray-400 group-hover:text-gray-500"
                      />
                      <span className="text-gray-500 hover:text-gray-700">
                        Lifetime Guarantee
                      </span>
                    </a>
                  </div> */}
                </form>
              </section>
            </div>
          </div>
        </div>

        <div className="mx-auto max-w-2xl px-4 py-24 sm:px-6 sm:py-32 lg:max-w-7xl lg:px-8">
          {/* Details section */}
          <section aria-labelledby="details-heading">
            <div className="flex flex-col items-center text-center">
              <h2
                id="details-heading"
                className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl"
              >
                The Fine Details
              </h2>
              <p className="mt-3 max-w-3xl text-lg text-gray-600">
                Our patented padded snack sleeve construction protects your
                favorite treats from getting smooshed during all-day adventures,
                long shifts at work, and tough travel schedules.
              </p>
            </div>

            <div className="mt-16 grid grid-cols-1 gap-y-16 lg:grid-cols-2 lg:gap-x-8">
              <div>
                <Image
                  width={500}
                  height={500}
                  alt="Drawstring top with elastic loop closure and textured interior padding."
                  src="https://tailwindcss.com/plus-assets/img/ecommerce-images/product-page-04-detail-product-shot-01.jpg"
                  className="aspect-3/2 w-full rounded-lg object-cover"
                />
                <p className="mt-8 text-base text-gray-500">
                  The 20L model has enough space for 370 candy bars, 6 cylinders
                  of chips, 1,220 standard gumballs, or any combination of
                  on-the-go treats that your heart desires. Yes, we did the
                  math.
                </p>
              </div>
              <div>
                <Image
                  width={500}
                  height={500}
                  alt="Front zipper pouch with included key ring."
                  src="https://tailwindcss.com/plus-assets/img/ecommerce-images/product-page-04-detail-product-shot-02.jpg"
                  className="aspect-3/2 w-full rounded-lg object-cover"
                />
                <p className="mt-8 text-base text-gray-500">
                  Up your snack organization game with multiple compartment
                  options. The quick-access stash pouch is ready for even the
                  most unexpected snack attacks and sharing needs.
                </p>
              </div>
            </div>
          </section>

          {/* Policies section */}
          <section aria-labelledby="policy-heading" className="mt-16 lg:mt-24">
            <h2 id="policy-heading" className="sr-only">
              Our policies
            </h2>
            <div className="mx-auto mt-12 grid max-w-sm grid-cols-1 gap-x-8 gap-y-10 sm:max-w-none lg:grid-cols-3">
              {incentives.map((incentive) => (
                <div
                  key={incentive.name}
                  className="text-center sm:flex sm:text-left lg:block lg:text-center"
                >
                  <div className="sm:shrink-0">
                    <div className="flow-root">
                      <Image
                        width={50}
                        height={50}
                        alt=""
                        src={incentive.imageSrc}
                        className="mx-auto size-16"
                      />
                    </div>
                  </div>
                  <div className="mt-3 sm:mt-0 sm:ml-6 lg:mt-6 lg:ml-0">
                    <h3 className="text-sm font-medium text-gray-900">
                      {incentive.name}
                    </h3>
                    <p className="mt-2 text-sm text-gray-500">
                      {incentive.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            {/* <div className="grid grid-cols-1 gap-y-12 sm:grid-cols-2 sm:gap-x-6 lg:grid-cols-4 lg:gap-x-8">
            {policies.map((policy) => (
              <div key={policy.name}>
                <Image alt="" src={policy.imageSrc} className="h-24 w-auto" />
                <h3 className="mt-6 text-base font-medium text-gray-900">
                  {policy.name}
                </h3>
                <p className="mt-3 text-base text-gray-500">
                  {policy.description}
                </p>
              </div>
            ))}
          </div> */}
          </section>
        </div>

        <section aria-labelledby="reviews-heading" className="bg-white">
          <div className="mx-auto max-w-2xl px-4 py-24 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-12 lg:gap-x-8 lg:px-8 lg:py-32">
            <div className="lg:col-span-4">
              <h2
                id="reviews-heading"
                className="text-2xl font-bold tracking-tight text-gray-900"
              >
                Customer Reviews
              </h2>

              <div className="mt-3 flex items-center">
                <div>
                  <div className="flex items-center">
                    {[0, 1, 2, 3, 4].map((rating) => (
                      <StarIcon
                        key={rating}
                        aria-hidden="true"
                        className={classNames(
                          reviews.average > rating
                            ? 'text-yellow-400'
                            : 'text-gray-300',
                          'size-5 shrink-0',
                        )}
                      />
                    ))}
                  </div>
                  <p className="sr-only">{reviews.average} out of 5 stars</p>
                </div>
                <p className="ml-2 text-sm text-gray-900">
                  Based on {reviews.totalCount} reviews
                </p>
              </div>

              <div className="mt-6">
                <h3 className="sr-only">Review data</h3>

                <dl className="space-y-3">
                  {reviews.counts.map((count) => (
                    <div
                      key={count.rating}
                      className="flex items-center text-sm"
                    >
                      <dt className="flex flex-1 items-center">
                        <p className="w-3 font-medium text-gray-900">
                          {count.rating}
                          <span className="sr-only"> star reviews</span>
                        </p>
                        <div
                          aria-hidden="true"
                          className="ml-1 flex flex-1 items-center"
                        >
                          <StarIcon
                            aria-hidden="true"
                            className={classNames(
                              count.count > 0
                                ? 'text-yellow-400'
                                : 'text-gray-300',
                              'size-5 shrink-0',
                            )}
                          />

                          <div className="relative ml-3 flex-1">
                            <div className="h-3 rounded-full border border-gray-200 bg-gray-100" />
                            {count.count > 0 ? (
                              <div
                                style={{
                                  width: `calc(${count.count} / ${reviews.totalCount} * 100%)`,
                                }}
                                className="absolute inset-y-0 rounded-full border border-yellow-400 bg-yellow-400"
                              />
                            ) : null}
                          </div>
                        </div>
                      </dt>
                      <dd className="ml-3 w-10 text-right text-sm text-gray-900 tabular-nums">
                        {Math.round((count.count / reviews.totalCount) * 100)}%
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>

              <div className="mt-10">
                <h3 className="text-lg font-medium text-gray-900">
                  Share your thoughts
                </h3>
                <p className="mt-1 text-sm text-gray-600">
                  If you’ve used this product, share your thoughts with other
                  customers
                </p>

                <a
                  href="#"
                  className="mt-6 inline-flex w-full items-center justify-center rounded-md border border-gray-300 bg-white px-8 py-2 text-sm font-medium text-gray-900 hover:bg-gray-50 sm:w-auto lg:w-full"
                >
                  Write a review
                </a>
              </div>
            </div>

            <div className="mt-16 lg:col-span-7 lg:col-start-6 lg:mt-0">
              <h3 className="sr-only">Recent reviews</h3>

              <div className="flow-root">
                <div className="-my-12 divide-y divide-gray-200">
                  {reviews.featured.map((review) => (
                    <div key={review.id} className="py-12">
                      <div className="flex items-center">
                        <Image
                          width={50}
                          height={50}
                          alt={`${review.author}.`}
                          src={review.avatarSrc}
                          className="size-12 rounded-full"
                        />
                        <div className="ml-4">
                          <h4 className="text-sm font-bold text-gray-900">
                            {review.author}
                          </h4>
                          <div className="mt-1 flex items-center">
                            {[0, 1, 2, 3, 4].map((rating) => (
                              <StarIcon
                                key={rating}
                                aria-hidden="true"
                                className={classNames(
                                  review.rating > rating
                                    ? 'text-yellow-400'
                                    : 'text-gray-300',
                                  'size-5 shrink-0',
                                )}
                              />
                            ))}
                          </div>
                          <p className="sr-only">
                            {review.rating} out of 5 stars
                          </p>
                        </div>
                      </div>

                      <div
                        dangerouslySetInnerHTML={{ __html: review.content }}
                        className="mt-4 space-y-6 text-base text-gray-600 italic"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
