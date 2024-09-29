import React from "react";

const Learning = () => {
    const openAngularApp = () => {
      window.location.href = 'http://localhost:3000'; 
    };

    return (
      <div className="flex justify-center">
        <h1>Welcome to the Learning Module Component</h1>
        {/* Button to open Angular app */}
        <button onClick={openAngularApp} >
          Open Learning Module
        </button>
      </div>
    );
  }

  export default Learning;

