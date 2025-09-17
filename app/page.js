"use client";

import { useEffect, useState } from "react";
import Button from "./components/Button";
import Quote from "./components/Quote";

export default function Home() {
  const [quotes, setQuotes] = useState([]);
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

  const loadMoreQuotes = () => {
    fetchQuotes(true);
  };

  return (
    <div>
      <h1 className='text-center text-5xl mb-6 text-gray-700 dark:text-gray-200'>
        Quotes frontend app
      </h1>

      {/* Quotes Display */}
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
        {quotes.map((quote) => (
          <Quote key={quote.id} quote={quote} />
        ))}
      </div>

      {/* Load More Button - only show when not in search mode */}
      <div className='flex justify-center mt-8'>
        <Button onClick={loadMoreQuotes} disabled={isLoading}>
          Load More Quotes
        </Button>
      </div>
    </div>
  );
}
