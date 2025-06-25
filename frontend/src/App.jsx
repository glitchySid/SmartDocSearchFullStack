// frontend/src/App.jsx
import { useState, useEffect } from "react";
import "./App.css";
import HomePage from "./pages/homepage";

function App() {
  const [theme, setTheme] = useState("dark"); // Default to dark mode

  useEffect(() => {
    // Apply the theme class to the document element
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme]);

  return (
    <>
      <HomePage theme={theme} setTheme={setTheme} />
    </>
  );
}

export default App;
