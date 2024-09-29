import React from "react";

const SignText = () => {
    const openAngularApp = () => {
      window.location.href = 'http://127.0.0.1:5000/dashboard'; 
    };

    return (
      <div className="flex justify-center">
        <h1>Welcome to the SignText Component</h1>
        {/* Button to open Angular app */}
        <button onClick={openAngularApp} >
          Open SignText
        </button>
      </div>
    );
  }

  export default SignText;

