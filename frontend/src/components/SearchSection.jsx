import React from "react";
import ResponseBox from "./responsebox";

const SearchSection = ({ query, setQuery, handleSearch, isQuerying, response }) => {
  return (
    <div className="flex flex-col items-center p-5 border-t border-gray-200 mt-6">
      <div className="w-full max-w-2xl">
        <h2 className="text-xl font-semibold mb-4">Search Your Documents</h2>

        <div className="w-full flex mb-8">
          <input
            type="text"
            placeholder="Input Your Search Query...."
            className="flex-grow border border-gray-300 rounded-l-lg px-4 py-2"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyUp={(e) => e.key === "Enter" && handleSearch()}
          />
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-r-lg flex items-center justify-center"
            onClick={handleSearch}
            disabled={isQuerying}
          >
            {isQuerying ? (
              <span className="flex items-center">
                <svg
                  className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Searching...
              </span>
            ) : (
              "Search"
            )}
          </button>
        </div>

        <div className="border border-gray-200">
          {isQuerying ? (
            <div className="flex justify-center mt-8 mb-8">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
              <p className="ml-4 text-gray-600">Searching documents...</p>
            </div>
          ) : (
            response && <ResponseBox apiResponse={response} />
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchSection;
