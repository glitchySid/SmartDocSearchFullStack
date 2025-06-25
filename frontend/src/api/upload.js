async function uploadFiles(files, collectionName) {
  // Create a FormData instance to mimic the multipart/form-data
  const formData = new FormData();

  // If files is an array, add each file
  if (Array.isArray(files) || files instanceof FileList) {
    for (let i = 0; i < files.length; i++) {
      formData.append("files", files[i]);
    }
  } else {
    // If it's a single file
    formData.append("files", files);
  }

  // Add collection name
  formData.append("collection_name", collectionName);

  try {
    const response = await fetch("http://127.0.0.1:8000/upload/", {
      method: "POST",
      headers: {
        accept: "application/json",
        // Don't set Content-Type here, it will be automatically set with the boundary
      },
      body: formData,
    });

    if (!response.ok) {
      throw new Error(
        `Upload failed: ${response.status} ${response.statusText}`,
      );
    }

    return await response.json();
  } catch (error) {
    console.error("Error uploading files:", error);
    throw error;
  }
}

export default uploadFiles;
