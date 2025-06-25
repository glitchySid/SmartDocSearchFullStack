// frontend/src/components/drag&drop.jsx
import React, { useState, useRef } from "react";

function DragDropFileUpload({ onFileUpload, collectionName, theme = "light" }) {
  const [isDragging, setIsDragging] = useState(false);
  const [files, setFiles] = useState([]);
  const fileInputRef = useRef(null);

  const handleDragEnter = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!isDragging) {
      setIsDragging(true);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const droppedFiles = Array.from(e.dataTransfer.files);
    setFiles(droppedFiles);

    if (onFileUpload) {
      onFileUpload(droppedFiles, collectionName);
    }
  };

  const handleFileSelect = (e) => {
    const selectedFiles = Array.from(e.target.files);
    setFiles(selectedFiles);

    if (onFileUpload) {
      onFileUpload(selectedFiles, collectionName);
    }
  };

  const openFileDialog = () => {
    fileInputRef.current.click();
  };

  return (
    <div className="w-full">
      <div
        className={`border-2 border-dashed rounded-lg p-6 flex flex-col items-center justify-center cursor-pointer transition-all ${
          isDragging
            ? theme === "dark"
              ? "border-blue-400 bg-blue-400/10"
              : "border-blue-500 bg-blue-50"
            : theme === "dark"
              ? "border-gray-700 hover:border-gray-500 hover:bg-gray-800/50"
              : "border-gray-300 hover:border-gray-400 hover:bg-gray-50"
        }`}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        onClick={openFileDialog}
      >
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileSelect}
          className="hidden"
          multiple
        />

        <svg
          className={`h-12 w-12 mb-3 ${
            isDragging
              ? "text-blue-500"
              : theme === "dark"
                ? "text-gray-400"
                : "text-gray-500"
          }`}
          stroke="currentColor"
          fill="none"
          viewBox="0 0 48 48"
          aria-hidden="true"
        >
          <path
            d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>

        <p className="mb-2 text-sm">
          <span className="font-semibold">Click to upload</span> or drag and
          drop
        </p>
        <p
          className={`text-xs ${theme === "dark" ? "text-gray-400" : "text-gray-500"}`}
        >
          PDF, DOCX, TXT and other document formats
        </p>

        {files.length > 0 && (
          <div className="mt-4 w-full">
            <p className="text-sm font-medium">Selected files:</p>
            <ul
              className={`mt-2 divide-y rounded-md border ${
                theme === "dark"
                  ? "divide-gray-700 border-gray-700"
                  : "divide-gray-200 border-gray-200"
              }`}
            >
              {files.map((file, index) => (
                <li
                  key={index}
                  className="px-3 py-2 text-sm flex justify-between"
                >
                  <span className="truncate">{file.name}</span>
                  <span
                    className={
                      theme === "dark" ? "text-gray-400" : "text-gray-500"
                    }
                  >
                    {(file.size / 1024).toFixed(2)} KB
                  </span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

export default DragDropFileUpload;
