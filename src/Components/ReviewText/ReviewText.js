import React, { Component } from "react";
import "./reviewText.sass";
import connect from "react-redux/es/connect/connect";
import { removeReview } from "../../actions/actions";

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
