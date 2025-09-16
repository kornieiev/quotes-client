"use client";

import { useEffect, useState } from "react";

export default function Home() {
  const [quotes, setQuotes] = useState([]);
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const fetchQuotes = async () => {
      const response = await fetch(
        "http://localhost:3000/quotes/random?limit=10"
      );
      const data = await response.json();
      setQuotes(data);
    };

    fetchQuotes();
  }, []);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    setIsDarkMode(mediaQuery.matches);
  }, []);

  const toggleTheme = () => {
    const newTheme = !isDarkMode;
    setIsDarkMode(newTheme);

    // Добавляем или убираем класс dark у html элемента
    if (newTheme) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  return (
    <div className='p-4 bg-slate-400 dark:bg-sky-900'>
      <button
        onClick={toggleTheme}
        className='fixed top-4 right-4 z-10 p-3 rounded-full bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl transition-all duration-200 border border-gray-200 dark:border-gray-600'
        aria-label='Toggle theme'
      >
        <div className='w-6 h-6 flex items-center justify-center'>
          {isDarkMode ? (
            // Sun icon for bright theme
            <svg
              className='w-5 h-5 text-yellow-500'
              fill='currentColor'
              viewBox='0 0 20 20'
            >
              <path
                fillRule='evenodd'
                d='M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z'
                clipRule='evenodd'
              />
            </svg>
          ) : (
            // Moon icon for dark theme
            <svg
              className='w-5 h-5 text-gray-700'
              fill='currentColor'
              viewBox='0 0 20 20'
            >
              <path d='M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z' />
            </svg>
          )}
        </div>
      </button>
      <h1 className='text-center text-5xl mb-6 text-gray-700 dark:text-gray-200'>
        Quotes frontend app
      </h1>
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
        {quotes.map((quote) => (
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
        ))}
      </div>
    </div>
  );
}
