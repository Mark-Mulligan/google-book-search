import React from "react";
import './BookInfoDisplay.css';

const BookInfoDisplay= ({ title, author, infoLink, imageLink, description, actionBtn, onActionBtnClick }) => {
  return (
    <div className="book-info-container mb-5">
      <div className="book-top-row">
        <div className="book-top-row-col-1">
          <h3>{title}</h3>
          <p>By: {author}</p>
        </div>
        <div className="book-top-row-col-2">
          <a href={infoLink} rel="noreferrer" target="_blank" className="btn btn-outline-dark mr-2">View</a>
          <button className="btn btn-outline-dark" onClick={onActionBtnClick}>{actionBtn}</button>
        </div>
      </div>
      <div className="book-bottom-row">
        <div className="book-bottom-row-col-1">
          <img alt="random" src={imageLink} />
        </div>
        <div className="book-bottom-row-col-2">
          <p>{description}</p>
        </div>
      </div>
    </div>
  );
};

export default BookInfoDisplay;
