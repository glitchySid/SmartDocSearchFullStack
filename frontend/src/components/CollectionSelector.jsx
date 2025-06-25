import React, { useEffect } from "react";

const CollectionSelector = ({
  collection,
  setCollection,
  collections,
  loadingCollections,
}) => {
  // Add debug logging when component renders
  useEffect(() => {
    console.log("CollectionSelector received collections:", collections);
    console.log("Type of collections:", typeof collections);
    console.log("Is Array?", Array.isArray(collections));
    if (collections && typeof collections === "object") {
      console.log("Collections keys:", Object.keys(collections));
    }
  }, [collections]);

  // Render simple input; if you decide to map over collections later, add a check like:
  // {Array.isArray(collections) && collections.map((coll) => (...))}

  return (
    <div className="mb-4">
      <label
        htmlFor="collection"
        className="block text-sm font-medium text-gray-700 mb-1"
      >
        Collection Name
      </label>

      {loadingCollections ? (
        <div className="flex items-center">
          <div className="animate-spin h-5 w-5 mr-2 border-t-2 border-b-2 border-blue-500 rounded-full"></div>
          <span className="text-gray-600">Loading collections...</span>
        </div>
      ) : (
        <input
          type="text"
          id="collection"
          className="w-full border border-gray-300 rounded-md px-3 py-2"
          placeholder="Enter collection name"
          value={collection}
          onChange={(e) => setCollection(e.target.value)}
        />
      )}

      {/* Debug display */}
      <div className="mt-2 text-xs text-gray-500">
        <p>Collections data: {JSON.stringify(collections)}</p>
      </div>
    </div>
  );
};

export default CollectionSelector;
