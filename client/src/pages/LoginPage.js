import React from "react";

const LoginPage = ({ onSignInClick, history, isSignedIn }) => {
  return (
    <div>
      Login Page
      <button onClick={() => onSignInClick(history)} className="ui red google button">
        <i className="google icon"></i>
        Sign In With Google
      </button>
      {isSignedIn ? <div>User Signed In</div> : <div>User Not Signed In</div>}
    </div>
  );
};

export default LoginPage;
