const FileUploadSection = ({
  collection,
  setCollection,
  collections,
  loadingCollections,
  handleFileUpload,
  uploadStatus,
  uploadError,
  uploading,
}) => {
  // Handle file input changes
  const onFileChange = (e) => {
    const files = e.target.files;
    handleFileUpload(files, collection);
  };

  return (
    <div className="my-4 p-4 border rounded-md">
      <div className="mb-4">
        <label htmlFor="collectionSelect" className="block mb-1 font-medium">
          Select Collection:
        </label>
        {loadingCollections ? (
          <span>Loading collections...</span>
        ) : (
          <select
            id="collectionSelect"
            value={collection}
            onChange={(e) => setCollection(e.target.value)}
            className="border border-gray-300 rounded-md px-2 py-1"
          >
            {Array.isArray(collections) &&
              collections.map((coll, index) => (
                <option key={index} value={coll}>
                  {coll}
                </option>
              ))}
          </select>
        )}
      </div>

      <div className="mb-4">
        <input type="file" multiple onChange={onFileChange} />
      </div>

      {uploading && <p className="text-blue-500">Uploading files...</p>}
      {uploadStatus && <p className="text-green-600">{uploadStatus}</p>}
      {uploadError && <p className="text-red-600">{uploadError}</p>}
    </div>
  );
};

export default FileUploadSection;
