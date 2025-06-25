async function getResponse(queryData) {
  const { question, collectionName } = queryData;

  try {
    const response = await fetch(
      `http://127.0.0.1:8000/ask/${collectionName}`,
      {
        method: "POST",
        headers: {
          accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(question), // Send question as an object
      },
    );

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    console.log("Success:", data);
    return data; // Return the data to the caller
  } catch (error) {
    console.error("Error:", error);
    throw error; // Rethrow the error to be handled by the caller
  }
}

export default getResponse;
