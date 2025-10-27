'use client'
import { useCartStore } from '@/store/cartStore'
export default function AddProductForm({ product }) {
  const { addToCart } = useCartStore()
  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
    })
  }
  return (
    <div className="mt-10 lg:col-start-1 lg:row-start-2 lg:max-w-lg lg:self-start">
      <section aria-labelledby="options-heading">
        <h2 id="options-heading" className="sr-only">
          Product options
        </h2>

        <form>
          {/* can put product options here */}
          {/* size  */}
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
          <div>
            <button
              type="button"
              className="flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50 focus:outline-hidden"
              onClick={handleAddToCart}
            >
              Add to bag
            </button>
          </div>
        </form>
      </section>
    </div>
  )
}
