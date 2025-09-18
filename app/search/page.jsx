"use client";

import { useState } from "react";
import Button from "../components/Button";
import Quote from "../components/Quote";
import { validateField } from "../heplers/searchFormValidation";

export default function Search() {
  const [searchResults, setSearchResults] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [searchForm, setSearchForm] = useState({
    author: "",
    text: "",
    category: "",
    limit: "5",
  });
  const [isSearchParamsInForm, setSearchParamsInForm] = useState();
  const [validationErrors, setValidationErrors] = useState({});

  // Form validation function
  const validateForm = () => {
    const errors = {};

    // Check if at least one search field is filled
    if (
      searchForm.author.trim() === "" &&
      searchForm.text.trim() === "" &&
      searchForm.category.trim() === ""
    ) {
      errors.form = "Please fill at least one search field";
      errors.author = "Author is empty";
      errors.text = "Text is empty";
      errors.category = "Category is empty";
    }

    // Validate individual fields
    Object.keys(searchForm).forEach((field) => {
      const fieldErrors = validateField(field, searchForm[field]);
      Object.assign(errors, fieldErrors);
    });

    return errors;
  };

  const searchQuotes = async (e) => {
    e.preventDefault();

    const formErrors = validateForm();

    if (Object.keys(formErrors).length > 0) {
      setValidationErrors(formErrors);
      setSearchParamsInForm("Not correct search params");
      return;
    }

    setIsLoading(true);
    setValidationErrors({});
    setSearchParamsInForm(false);

    try {
      setValidationErrors({});

      const queryParams = new URLSearchParams();

      if (searchForm.author.trim()) {
        queryParams.append("author", searchForm.author.trim());
      }
      if (searchForm.text.trim()) {
        queryParams.append("text", searchForm.text.trim());
      }
      if (searchForm.category.trim()) {
        queryParams.append("category", searchForm.category.trim());
      }

      queryParams.append("limit", searchForm.limit);

      const response = await fetch(
        `http://localhost:3000/quotes/?${queryParams.toString()}`
      );
      const data = await response.json();

      setSearchResults(data);
    } catch (error) {
      console.error("Error searching quotes:", error);
    } finally {
      setIsLoading(false);
      setSearchParamsInForm(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    // Update form state
    setSearchForm((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Validate field on change
    const fieldErrors = validateField(name, value);

    setValidationErrors((prev) => {
      const newErrors = { ...prev };

      // Remove error for this field if validation passes
      if (Object.keys(fieldErrors).length === 0) {
        delete newErrors[name];
        // Also clear form error if any field is valid
        if (value.trim() !== "") {
          delete newErrors.form;
        }
      } else {
        // Add new error for this field
        Object.assign(newErrors, fieldErrors);
      }

      return newErrors;
    });

    // Clear search params error if user is typing
    if (value.trim() !== "") {
      setSearchParamsInForm(false);
    }
  };

  const clearSearch = () => {
    setSearchResults(null);
    setSearchForm({
      author: "",
      text: "",
      category: "",
      limit: "5",
    });
    setSearchParamsInForm(false);
  };

  const hasSearchResults = searchResults !== null;

  return (
    <div className='min-h-screen p-4 bg-slate-400 dark:bg-sky-900'>
      <div className='max-w-6xl mx-auto '>
        <h1 className='text-center text-5xl mb-8 text-gray-700 dark:text-gray-200'>
          Search Quotes
        </h1>

        {/* Search Form */}
        <div className='max-w-4xl mx-auto mb-8 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md'>
          <form onSubmit={searchQuotes} className='space-y-4'>
            <div className='grid grid-cols-1 md:grid-cols-4 gap-4'>
              {/* Author Input */}
              <div>
                <label
                  htmlFor='author'
                  className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1'
                >
                  Author
                </label>
                <input
                  type='text'
                  id='author'
                  name='author'
                  value={searchForm.author}
                  onChange={handleInputChange}
                  placeholder='Search by author...'
                  className='w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400'
                />
                {validationErrors.author && (
                  <span className='text-rose-600 text-xs'>
                    {validationErrors.author}
                  </span>
                )}
              </div>

              {/* Text Input */}
              <div>
                <label
                  htmlFor='text'
                  className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1'
                >
                  Text
                </label>
                <input
                  type='text'
                  id='text'
                  name='text'
                  value={searchForm.text}
                  onChange={handleInputChange}
                  placeholder='Search in quote text...'
                  className='w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400'
                />
                {validationErrors.text && (
                  <span className='text-rose-600 text-xs'>
                    {validationErrors.author}
                  </span>
                )}
              </div>

              {/* Category Input */}
              <div>
                <label
                  htmlFor='category'
                  className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1'
                >
                  Category
                </label>
                <input
                  type='text'
                  id='category'
                  name='category'
                  value={searchForm.category}
                  onChange={handleInputChange}
                  placeholder='Search by category...'
                  className='w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400'
                />
                {validationErrors.category && (
                  <span className='text-rose-600 text-xs'>
                    {validationErrors.category}
                  </span>
                )}
              </div>

              {/* Limit Select */}
              <div>
                <label
                  htmlFor='limit'
                  className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1'
                >
                  Limit
                </label>
                <select
                  id='limit'
                  name='limit'
                  value={searchForm.limit}
                  onChange={handleInputChange}
                  className='w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white'
                >
                  <option value='5'>5</option>
                  <option value='10'>10</option>
                  <option value='20'>20</option>
                  <option value='50'>50</option>
                </select>
              </div>
            </div>

            <div className='flex gap-4 justify-center'>
              <Button type='submit' disabled={isLoading}>
                {isLoading ? "Searching..." : "Search Quotes"}
              </Button>

              {hasSearchResults && (
                <Button
                  type='button'
                  onClick={clearSearch}
                  className='bg-gray-500 hover:bg-gray-600 dark:bg-gray-600 dark:hover:bg-gray-700'
                >
                  Clear Search
                </Button>
              )}
            </div>
          </form>

          {hasSearchResults && (
            <div className='mt-4 p-3 bg-blue-100 dark:bg-blue-900 rounded-md'>
              <p className='text-blue-800 dark:text-blue-200'>
                Found {searchResults.length} result(s)
              </p>
            </div>
          )}
        </div>

        {validationErrors.form && (
          <div className='text-center mb-8'>
            <p className='text-red-700 dark:text-gray-400 text-lg'>
              {validationErrors.form}
            </p>
          </div>
        )}

        {/* Search Results */}
        {hasSearchResults && (
          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
            {searchResults.map((quote) => (
              <Quote key={quote.id} quote={quote} />
            ))}
          </div>
        )}

        {/* Messages */}
        {hasSearchResults && searchResults.length === 0 && !isLoading && (
          <div className='text-center mt-8'>
            <p className='text-gray-600 dark:text-gray-400 text-lg'>
              No quotes found matching your search criteria.
            </p>
          </div>
        )}

        {!hasSearchResults && (
          <div className='text-center mt-8'>
            <p className='text-gray-600 dark:text-gray-400 text-lg'>
              Enter search criteria and click &quot;Search Quotes&quot; to find
              quotes.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
