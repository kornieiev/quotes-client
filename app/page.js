"use client";

import { useEffect, useState } from "react";
import Button from "./components/Button";
import Quote from "./components/Quote";
import ThemeToggle from "./components/ThemeToggle";

export default function Home() {
  const [quotes, setQuotes] = useState([]);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const fetchQuotes = async (append = false) => {
    setIsLoading(true);
    try {
      const response = await fetch(
        "http://localhost:3000/quotes/random?limit=10"
      );
      const data = await response.json();

      if (append) {
        setQuotes((prevQuotes) => [...prevQuotes, ...data]);
      } else {
        setQuotes(data);
      }
    } catch (error) {
      console.error("Error fetching quotes:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
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

  const loadMoreQuotes = () => {
    fetchQuotes(true);
  };

  return (
    <div className='min-h-screen p-4 bg-slate-400 dark:bg-sky-900'>
      <ThemeToggle onClick={toggleTheme} isDarkMode={isDarkMode} />
      <h1 className='text-center text-5xl mb-6 text-gray-700 dark:text-gray-200'>
        Quotes frontend app
      </h1>
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
        {quotes.map((quote) => (
          <Quote key={quote.id} quote={quote} />
        ))}
      </div>
      <div className='flex justify-center'>
        <Button onClick={loadMoreQuotes} disabled={isLoading}>
          Load More Quotes
        </Button>
      </div>
    </div>
  );
}
