import React, { Component } from "react";
import "./reviewForm.sass";
import connect from "react-redux/es/connect/connect";
import { setReview } from "../../actions/actions";

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
    this.props.setReview(
      this.state.reviewText,
      this.props.getMovie,
      this.props.user
    );
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
const mapStateToProps = state => ({
  user: state.user.user
});
export default connect(
  mapStateToProps,
  { setReview }
)(ReviewForm);
