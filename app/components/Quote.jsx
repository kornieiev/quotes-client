import React from 'react'

export default function Quote({ quote }) {
  return (
    <div
      key={quote.id}
      className='bg-gray-200 dark:bg-gray-600 p-4 shadow-md rounded-lg'
    >
      <p className='mb-4 text-2xl italic text-gray-900 dark:text-white'>
        &quot;{quote.text}&quot;
      </p>
      <p className='text-right font-semibold text-gray-700 dark:text-gray-200'>
        — {quote.author}
      </p>
      <div className='flex flex-wrap mt-2'>
        {quote.categories.map((category) => (
          <span
            key={category}
            className='text-lg bg-gray-300 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-4 py-2 rounded-full mr-2 mb-2'
          >
            {category}
          </span>
        ))}
      </div>
    </div>
  );
}
