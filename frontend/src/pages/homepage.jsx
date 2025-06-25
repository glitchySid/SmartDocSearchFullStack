// frontend/src/pages/homepage.jsx
import { useState, useEffect } from "react";
import DragDropFileUpload from "../components/drag&drop";
import ResponseBox from "../components/responsebox";
import getResponse from "../api/query";
import uploadFiles from "../api/upload";
import getCollections from "../api/collections";

export default function HomePage({ theme, setTheme }) {
  const [response, setResponse] = useState("");
  const [query, setQuery] = useState("");
  const [collection, setCollection] = useState("");
  const [collections, setCollections] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState(null);
  const [uploadError, setUploadError] = useState(null);
  const [isQuerying, setIsQuerying] = useState(false);
  const [loadingCollections, setLoadingCollections] = useState(false);

  useEffect(() => {
    // Fetch collections when component mounts
    const fetchCollections = async () => {
      setLoadingCollections(true);
      try {
        const collectionsData = await getCollections();
        setCollections(collectionsData || []);
        // Set first collection as default if available
        if (collectionsData && collectionsData.length > 0) {
          setCollection(collectionsData[0]);
        }
      } catch (error) {
        console.error("Failed to fetch collections:", error);
      } finally {
        setLoadingCollections(false);
      }
    };

    fetchCollections();
  }, []);

  const handleSearch = async () => {
    if (query.trim()) {
      setIsQuerying(true); // Start loading
      setResponse(""); // Clear previous response while loading

      try {
        const result = await getResponse({
          question: query,
          collectionName: collection,
        });
        setResponse(result || "No response received");
      } catch (error) {
        setResponse("Error: Unable to get response from server");
        console.error("Search error:", error);
      } finally {
        setIsQuerying(false); // End loading regardless of outcome
      }
    }
  };

  const handleFileUpload = async (files, collectionName) => {
    // Use collection from state if not provided
    const finalCollectionName = collectionName || collection;

    if (!finalCollectionName) {
      setUploadError("Please provide a collection name");
      return;
    }

    if (files.length === 0) {
      setUploadError("No files selected");
      return;
    }

    setUploading(true);
    setUploadError(null);
    setUploadStatus("Uploading files...");

    try {
      const result = await uploadFiles(files, finalCollectionName);
      setUploadStatus(
        `Files uploaded successfully! Collection: ${finalCollectionName}`,
      );
      console.log("Upload result:", result);

      // Refresh the collections list after upload
      const updatedCollections = await getCollections();
      setCollections(updatedCollections || []);
    } catch (error) {
      setUploadError(`Upload failed: ${error.message}`);
      setUploadStatus(null);
    } finally {
      setUploading(false);
    }
  };

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <div
      className={`min-h-screen ${theme === "dark" ? "bg-black text-white" : "bg-white text-gray-900"} py-8 px-4 sm:px-6 lg:px-8`}
    >
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header with Theme Toggle */}
        <div className="text-center relative">
          <button
            onClick={toggleTheme}
            className={`absolute right-0 top-0 p-2 rounded-full ${
              theme === "dark"
                ? "bg-gray-800 text-gray-300"
                : "bg-gray-200 text-gray-700"
            }`}
            aria-label="Toggle theme"
          >
            {theme === "dark" ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="12" r="5"></circle>
                <line x1="12" y1="1" x2="12" y2="3"></line>
                <line x1="12" y1="21" x2="12" y2="23"></line>
                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
                <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
                <line x1="1" y1="12" x2="3" y2="12"></line>
                <line x1="21" y1="12" x2="23" y2="12"></line>
                <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
                <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
              </svg>
            )}
          </button>

          <h1 className="text-4xl font-bold tracking-tight">SmartDocSearch</h1>
          <p
            className={`mt-3 text-lg ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}
          >
            Your AI-powered document search solution
          </p>
        </div>

        {/* File Upload Section */}
        <div
          className={`rounded-lg border ${
            theme === "dark"
              ? "border-gray-700 bg-black"
              : "border-gray-200 bg-white"
          } shadow-sm overflow-hidden`}
        >
          <div
            className={`flex flex-col space-y-1.5 p-6 border-b ${
              theme === "dark" ? "border-gray-700" : "border-gray-200"
            }`}
          >
            <h3 className="text-2xl font-semibold leading-none tracking-tight">
              Upload Documents
            </h3>
            <p
              className={`text-sm ${
                theme === "dark" ? "text-gray-400" : "text-gray-600"
              }`}
            >
              Add documents to your collection for AI-powered search
            </p>
          </div>

          <div className="p-6 space-y-4">
            <div className="space-y-2">
              <label htmlFor="collection" className="text-sm font-medium">
                Collection Name
              </label>

              {loadingCollections ? (
                <div className="flex items-center">
                  <div
                    className={`animate-spin h-5 w-5 mr-2 border-t-2 border-b-2 ${
                      theme === "dark" ? "border-blue-400" : "border-blue-600"
                    } rounded-full`}
                  ></div>
                  <span
                    className={
                      theme === "dark" ? "text-gray-400" : "text-gray-600"
                    }
                  >
                    Loading collections...
                  </span>
                </div>
              ) : (
                <div className="flex space-x-4 items-center">
                  {collections.length > 0 ? (
                    <>
                      <select
                        id="collection"
                        className={`flex h-10 w-full rounded-md border ${
                          theme === "dark"
                            ? "bg-gray-800 border-gray-700 text-white"
                            : "bg-white border-gray-200 text-gray-900"
                        } px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2`}
                        value={collection}
                        onChange={(e) => setCollection(e.target.value)}
                      >
                        {collections.map((col) => (
                          <option key={col} value={col}>
                            {col}
                          </option>
                        ))}
                      </select>
                      <span
                        className={`text-sm ${
                          theme === "dark" ? "text-gray-400" : "text-gray-600"
                        }`}
                      >
                        or
                      </span>
                    </>
                  ) : (
                    <div
                      className={`text-sm ${
                        theme === "dark" ? "text-gray-400" : "text-gray-600"
                      } mr-4`}
                    >
                      No collections available. Create one:
                    </div>
                  )}
                  <input
                    type="text"
                    className={`flex h-10 w-full rounded-md border ${
                      theme === "dark"
                        ? "bg-gray-800 border-gray-700 text-white placeholder:text-gray-500"
                        : "bg-white border-gray-200 text-gray-900 placeholder:text-gray-400"
                    } px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2`}
                    placeholder="Create new collection"
                    value={collections.length === 0 ? collection : ""}
                    onChange={(e) => setCollection(e.target.value)}
                  />
                </div>
              )}
            </div>

            <DragDropFileUpload
              onFileUpload={handleFileUpload}
              collectionName={collection}
              theme={theme}
            />

            {uploadStatus && (
              <div
                className={`p-4 ${
                  theme === "dark"
                    ? "bg-green-900/20 border-green-800/30 text-green-400"
                    : "bg-green-100 border-green-200 text-green-700"
                } rounded-md border`}
              >
                {uploadStatus}
              </div>
            )}

            {uploadError && (
              <div
                className={`p-4 ${
                  theme === "dark"
                    ? "bg-red-900/20 border-red-800/30 text-red-400"
                    : "bg-red-100 border-red-200 text-red-700"
                } rounded-md border`}
              >
                {uploadError}
              </div>
            )}

            {uploading && (
              <div className="flex items-center justify-center py-4">
                <div
                  className={`animate-spin h-8 w-8 mr-2 border-t-2 border-b-2 ${
                    theme === "dark" ? "border-blue-400" : "border-blue-600"
                  } rounded-full`}
                ></div>
                <span
                  className={
                    theme === "dark" ? "text-gray-400" : "text-gray-600"
                  }
                >
                  Uploading files...
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Search Section */}
        <div
          className={`rounded-lg border ${
            theme === "dark"
              ? "border-gray-700 bg-black"
              : "border-gray-200 bg-white"
          } shadow-sm overflow-hidden`}
        >
          <div
            className={`flex flex-col space-y-1.5 p-6 border-b ${
              theme === "dark" ? "border-gray-700" : "border-gray-200"
            }`}
          >
            <h3 className="text-2xl font-semibold leading-none tracking-tight">
              Search Documents
            </h3>
            <p
              className={`text-sm ${
                theme === "dark" ? "text-gray-400" : "text-gray-600"
              }`}
            >
              Ask questions about your uploaded documents
            </p>
          </div>

          <div className="p-6 space-y-4">
            <div className="flex space-x-2">
              <input
                type="text"
                placeholder="Ask a question about your documents..."
                className={`flex h-10 w-full rounded-md border ${
                  theme === "dark"
                    ? "bg-gray-800 border-gray-700 text-white placeholder:text-gray-500"
                    : "bg-white border-gray-200 text-gray-900 placeholder:text-gray-400"
                } px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2`}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyUp={(e) => e.key === "Enter" && handleSearch()}
              />
              <button
                onClick={handleSearch}
                disabled={!query.trim() || !collection || isQuerying}
                className={`flex items-center justify-center px-4 py-2 rounded-md font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors ${
                  theme === "dark"
                    ? "bg-blue-600 hover:bg-blue-700 text-white"
                    : "bg-blue-600 hover:bg-blue-700 text-white"
                } disabled:opacity-70 disabled:cursor-not-allowed text-sm`}
              >
                {isQuerying ? (
                  <>
                    <svg
                      className="animate-spin -ml-1 mr-2 h-4 w-4"
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
                  </>
                ) : (
                  "Search"
                )}
              </button>
            </div>

            {/* Response Display Area */}
            {isQuerying ? (
              <div
                className={`flex flex-col items-center justify-center space-y-4 py-12 border rounded-lg ${
                  theme === "dark" ? "border-gray-700" : "border-gray-200"
                }`}
              >
                <div
                  className={`animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 ${
                    theme === "dark" ? "border-blue-400" : "border-blue-600"
                  }`}
                ></div>
                <p
                  className={
                    theme === "dark" ? "text-gray-400" : "text-gray-600"
                  }
                >
                  Searching documents...
                </p>
              </div>
            ) : response ? (
              <div
                className={`border rounded-lg p-6 min-h-[200px] max-h-[500px] overflow-y-auto ${
                  theme === "dark" ? "border-gray-700" : "border-gray-200"
                }`}
              >
                <ResponseBox apiResponse={response} theme={theme} />
              </div>
            ) : (
              <div
                className={`border rounded-lg p-6 text-center min-h-[200px] flex items-center justify-center ${
                  theme === "dark"
                    ? "border-gray-700 bg-gray-800/50 text-gray-400"
                    : "border-gray-200 bg-gray-50 text-gray-500"
                }`}
              >
                <p>Your search results will appear here</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
