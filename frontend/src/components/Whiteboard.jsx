import React from "react";

const Whiteboard = () => {
    const openAngularApp = () => {
      window.location.href = 'http://localhost:3000/'; 
    };

    return (
      <div className="flex justify-center">
        <h1>Welcome to the whiteboard Component</h1>
        {/* Button to open Angular app */}
        <button onClick={openAngularApp} >
          Open whiteboard
        </button>
      </div>
    );
  }

  export default Whiteboard;

