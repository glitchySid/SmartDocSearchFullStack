// frontend/src/components/responsebox.jsx
import React, { useState, useEffect } from "react";

export default function ResponseBox({ apiResponse, theme = "light" }) {
  const [response, setResponse] = useState("Write some query");

  useEffect(() => {
    if (apiResponse) {
      setResponse(apiResponse);
    }
  }, [apiResponse]);

  // Render the response based on its type
  const renderResponse = () => {
    if (typeof response === "string") {
      return <p className="whitespace-pre-line">{response}</p>;
    } else if (response && typeof response === "object") {
      // If it's an object with 'output' property
      if (response.output !== undefined) {
        return <p className="whitespace-pre-line">{response.output}</p>;
      }

      // If it's an object with sources
      if (response.answer) {
        return (
          <div>
            <p className="whitespace-pre-line mb-4">{response.answer}</p>
            {response.sources && response.sources.length > 0 && (
              <div
                className={`mt-4 pt-4 border-t ${
                  theme === "dark" ? "border-gray-700" : "border-gray-200"
                }`}
              >
                <h3 className="text-sm font-medium mb-2">Sources:</h3>
                <ul
                  className={`list-disc pl-5 text-sm ${
                    theme === "dark" ? "text-gray-400" : "text-gray-500"
                  }`}
                >
                  {response.sources.map((source, idx) => (
                    <li key={idx}>{source}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        );
      }

      // Fallback: stringify the object in a readable format
      return (
        <pre
          className={`text-sm overflow-auto p-2 rounded ${
            theme === "dark" ? "bg-gray-900" : "bg-gray-50"
          }`}
        >
          {JSON.stringify(response, null, 2)}
        </pre>
      );
    }
    return "No valid response";
  };

  return (
    <div className="w-full p-6 max-h-[500px] overflow-y-auto">
      {renderResponse()}
    </div>
  );
}
