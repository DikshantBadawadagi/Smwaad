import React from "react";

const Interview = () => {
    const openAngularApp = () => {
      window.location.href = 'http://localhost:3000'; 
    };

    return (
      <div className="flex justify-center">
        <h1>Welcome to the SignText Component</h1>
        {/* Button to open Angular app */}
        <button onClick={openAngularApp} >
          Open Interview
        </button>
      </div>
    );
  }

  export default Interview;

