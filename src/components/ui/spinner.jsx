import clsx from 'clsx'

export function Spinner({ loading = false, children, className }) {
  return (
    <div className={clsx('relative', className)}>
      {children}
      {loading && (
        <div className="absolute inset-0 z-50 flex items-center justify-center">
          {/* Overlay mask */}
          <div className="absolute inset-0 bg-white/80 backdrop-blur-sm dark:bg-gray-900/80" />

          {/* Spinner icon */}
          <div className="relative">
            <div className="size-12 animate-spin rounded-full border-4 border-gray-200 border-t-indigo-600 dark:border-gray-700 dark:border-t-indigo-500" />
          </div>
        </div>
      )}
    </div>
  )
}

// Alternative spinner with text
export function SpinnerWithText({
  loading = false,
  children,
  text = 'Loading...',
  className,
}) {
  return (
    <div className={clsx('relative', className)}>
      {children}
      {loading && (
        <div className="absolute inset-0 z-50 flex flex-col items-center justify-center">
          {/* Overlay mask */}
          <div className="absolute inset-0 bg-white/80 backdrop-blur-sm dark:bg-gray-900/80" />

          {/* Spinner icon and text */}
          <div className="relative flex flex-col items-center gap-3">
            <div className="size-12 animate-spin rounded-full border-4 border-gray-200 border-t-indigo-600 dark:border-gray-700 dark:border-t-indigo-500" />
            {text && (
              <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                {text}
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

// Standalone spinner (no wrapper)
export function SpinnerIcon({ className, size = 'md' }) {
  const sizeClasses = {
    sm: 'size-4 border-2',
    md: 'size-8 border-3',
    lg: 'size-12 border-4',
    xl: 'size-16 border-4',
  }

  return (
    <div
      className={clsx(
        'animate-spin rounded-full border-gray-200 border-t-indigo-600 dark:border-gray-700 dark:border-t-indigo-500',
        sizeClasses[size],
        className,
      )}
    />
  )
}
