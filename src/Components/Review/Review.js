import React, { Component } from "react";
import "./review.sass";

export default class Review extends Component {
  state = {
    reviewText: ""
  };
  updateReviewText = e => {
    this.setState({
      reviewText: e.target.value
    });
  };
  sendReview = e => {
    e.preventDefault();
    this.props.addReview(this.state.reviewText, this.props.getMovie);
  };
  render() {
    return (
      <form onSubmit={this.sendReview} className="review">
        <textarea
          value={this.state.reviewText}
          onChange={this.updateReviewText}
          className="review__body"
          cols="1"
          rows="1"
          placeholder="Type your review here"
        />
        <button className="btn review__btn" type="submit">
          Add review
        </button>
      </form>
    );
  }
}
