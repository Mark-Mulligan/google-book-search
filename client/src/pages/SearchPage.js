import React from "react";

const SearchPage = ({ history, onSignOutClick, isSignedIn }) => {
  return (
    <div>
      Search Page
      <button onClick={() => onSignOutClick(history)} className="ui red google button">
        <i className="google icon"></i>
        Sign Out
      </button>
      {isSignedIn ? <div>User Signed In</div> : <div>User Not Signed In</div>}
    </div>
  );
};

export default SearchPage;
