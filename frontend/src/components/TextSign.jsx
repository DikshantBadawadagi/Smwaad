import React from "react";

const TextSign = () => {
    const openAngularApp = () => {
      window.location.href = 'http://localhost:4200'; 
    };

    return (
      <div className="flex justify-center">
        <h1>Welcome to the TextSign Component</h1>
        {/* Button to open Angular app */}
        <button onClick={openAngularApp} >
          Open Angular Project
        </button>
      </div>
    );
  }

  export default TextSign;