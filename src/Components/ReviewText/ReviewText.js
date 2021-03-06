import React from "react";
import "./reviewText.sass";

const ReviewText = ({ user, review, setReview, movie }) => {
  return (
    <div className="review-text">
      <p>{review}</p>
      <button
        className="btn btn-review btn-review-del"
        onClick={() => {
          setReview(null, movie, user);
        }}
      >
        <i className="fas fa-trash" />
      </button>
    </div>
  );
};

export default ReviewText;
