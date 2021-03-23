import React from "react";
import SearchForm from '../components/SearchForm';

const SearchPage = ({ history, onSignOutClick, isSignedIn }) => {
  return (
    <div>
      <h1>Search Page</h1>
      <button onClick={() => onSignOutClick(history)} className="ui red google button">
        <i className="google icon"></i>
        Sign Out
      </button>
      {isSignedIn ? <div>User Signed In</div> : <div>User Not Signed In</div>}
      <SearchForm />
    </div>
  );
};

export default SearchPage;
