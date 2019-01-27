import React, { Component } from "react";
import "./reviewText.sass";
import connect from "react-redux/es/connect/connect";
import { removeReview } from "../../actions/actions";

class ReviewText extends Component {
  remove = () => {
    this.props.removeReview(this.props.review);
  };
  render() {
    return (
      <div className="review-text">
        <p>{this.props.review}</p>
        <button className="btn btn-review-del" onClick={this.remove}>
					<i className="fas fa-trash" />
				</button>
      </div>
    );
  }
}

export default connect(
  null,
  { removeReview }
)(ReviewText);
