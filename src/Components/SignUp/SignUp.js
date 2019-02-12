import React, { Component } from "react";
import connect from "react-redux/es/connect/connect";
import { userError } from "../../actions/userActions";
import { base } from "../../firebase/firebase";
import { withRouter } from "react-router";

class SignUp extends Component {
  state = {
    user: {
      login: "",
      email: "",
      password: ""
    }
  };
  changeUser = e => {
    const user = Object.assign({}, this.state.user);
    user[e.target.name] = e.target.value;
    this.setState({ user });
  };
  signup = e => {
    e.preventDefault();
    if (!this.state.user.login) {
      this.props.userError({ message: "User name is empty!" });
    } else {
      base
        .auth()
        .createUserWithEmailAndPassword(
          this.state.user.email,
          this.state.user.password
        )
        .then(res => {
          res.user.updateProfile({
            displayName: this.state.user.login
          });
        })
        .then(() => {
          this.props.history.push("/login");
        })
        .catch(error => {
          this.props.userError(error);
        });
    }
  };
  render() {
    const error = this.props.error.isWarning ? (
      <p className="warning-msg">{this.props.error.message}</p>
    ) : null;
    return (
      <div className="app-form-wrapper">
        <h2 style={{ textAlign: "center" }}>Sign up</h2>
        {error}
        <form className="signup-form" onSubmit={this.signup}>
          <input
            type="text"
            name="login"
            onChange={this.changeUser}
            value={this.state.user.login}
            className="app-input signup-form__login"
            placeholder="Login"
          />
          <input
            type="text"
            name="email"
            onChange={this.changeUser}
            value={this.state.user.email}
            className="app-input signup-form__email"
            placeholder="Email"
          />
          <input
            type="password"
            name="password"
            onChange={this.changeUser}
            value={this.state.user.password}
            className="app-input signup-form__password"
            placeholder="Password"
          />
          <button type="submit" className="btn btn-form signup-form__submit">
            Sign up
          </button>
        </form>
      </div>
    );
  }
}
const mapStateToProps = state => ({
  error: state.user.error
});
export default withRouter(
  connect(
    mapStateToProps,
    { userError }
  )(SignUp)
);
