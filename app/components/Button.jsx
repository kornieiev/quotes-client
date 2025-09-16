import React from "react";

export default function Button({ onClick, disabled, children }) {
  console.log("children", children);
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className='mt-6 px-8 py-3 bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed'
    >
      {disabled ? (
        <div className='flex items-center space-x-2'>
          <div className='w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin'></div>
          <span>Loading...</span>
        </div>
      ) : (
        `${children}`
      )}
    </button>
  );
}
