async function getCollections() {
  try {
    const response = await fetch("http://127.0.0.1:8000/collections", {
      method: "GET",
      headers: {
        accept: "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    
    // Check if data.collections exists and is an array
    if (data && data.collections && Array.isArray(data.collections)) {
      return data.collections; // Return the array of collection names
    } else {
      console.warn("API did not return a valid collections array", data);
      return []; // Return empty array as fallback
    }
  } catch (error) {
    console.error("Error fetching collections:", error);
    // Return empty array instead of throwing error to prevent UI crashes
    return [];
  }
}

export default getCollections;
