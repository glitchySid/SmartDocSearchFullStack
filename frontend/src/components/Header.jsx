import React from "react";

const Header = () => {
  return (
    <div className="flex flex-col items-center p-5">
      <h1 className="text-4xl font-bold">Welcome to SmartDocSearch!</h1>
      <p className="text-lg text-gray-600 mt-2">
        Your AI-powered document search solution.
      </p>
    </div>
  );
};

export default Header;
