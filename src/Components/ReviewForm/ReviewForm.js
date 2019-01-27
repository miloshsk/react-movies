import React, { Component } from "react";
import "./reviewForm.sass";
import connect from "react-redux/es/connect/connect";
import { addReview } from "../../actions/actions";

class ReviewForm extends Component {
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
    this.setState({
      reviewText: ""
    });
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
        <button className="btn btn-review-add" type="submit">
					Add review
        </button>
      </form>
    );
  }
}

export default connect(
  null,
  { addReview }
)(ReviewForm);
