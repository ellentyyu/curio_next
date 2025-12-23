export default function Footer() {
  return (
    <footer aria-labelledby="footer-heading" className="bg-bg">
      <h2 id="footer-heading" className="sr-only">
        Footer
      </h2>
      <div className="border-t border-gray-200">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="py-20">
            <div className="grid grid-cols-1 md:grid-flow-col md:auto-rows-min md:grid-cols-12 md:gap-x-8 md:gap-y-16">
              {/* Image section */}
              <div className="col-span-1 md:col-span-2 lg:col-start-1 lg:row-start-1">
                <p className="font-mrs-sheppards text-6xl text-primary">
                  Curio
                </p>
                {/* <Image
                  width={32}
                  height={32}
                  alt=""
                  src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=600"
                  className="h-8 w-auto"
                /> */}
              </div>
            </div>
          </div>

          <div className="border-t border-gray-100 py-10 text-center">
            <p>Ouch you stepped on my footer!</p>
            <p className="text-sm text-gray-500">
              &copy; 2025 Curio Store. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
