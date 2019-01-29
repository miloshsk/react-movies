import React from "react";
import "./reviewText.sass";

const ReviewText = ({ review, removeReview }) => {
  return (
    <div className="review-text">
      <p>{review}</p>
      <button
        className="btn btn-review btn-review-del"
        onClick={() => {
          removeReview(review);
        }}
      >
        <i className="fas fa-trash" />
      </button>
    </div>
  );
};

export default ReviewText;
