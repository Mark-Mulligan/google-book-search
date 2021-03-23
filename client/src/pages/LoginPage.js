import React from "react";

const LoginPage = ({ onSignInClick, history, isSignedIn }) => {
  return (
    <div>
      Login Page
      <button onClick={() => onSignInClick(history)} className="btn btn-danger">
        <i className="fab fa-google mr-1"></i>
        Sign In With Google
      </button>
      {isSignedIn ? <div>User Signed In</div> : <div>User Not Signed In</div>}
    </div>
  );
};

export default LoginPage;
