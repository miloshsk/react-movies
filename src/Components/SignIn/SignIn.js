import React, { Component } from "react";
import connect from "react-redux/es/connect/connect";
import Spinner from ".././Spinner/Spinner";
import { userLogin, userIsLogin, userError } from "../../actions/userActions";
import { showSpinner } from "../../actions/actions";
import { base } from "../../firebase/firebase";
import { withRouter } from "react-router";

class SignIn extends Component {
  state = {
    user: {
      email: "",
      password: ""
    }
  };
  changeUserInput = e => {
    const user = Object.assign({}, this.state.user);
    user[e.target.name] = e.target.value;
    this.setState({ user });
  };

  login = e => {
    e.preventDefault();
    this.props.showSpinner(true);
    base
      .auth()
      .signInWithEmailAndPassword(
        this.state.user.email,
        this.state.user.password
      )
      .then(res => {
        this.props.userLogin(res.user.displayName);
      })
      .then(() => {
        this.props.userIsLogin();
      })
      .then(() => {
        this.props.showSpinner(false);
      })
      .then(() => {
        this.props.history.push("/");
      })
      .catch(error => {
        this.props.showSpinner(false);
        this.props.userError(error);
      });
  };
  render() {
    const error = this.props.error.isWarning ? (
      <p className="warning-msg">{this.props.error.message}</p>
    ) : null;
    if (this.props.loading) {
      return <Spinner />;
    }
    return (
      <div className="app-form-wrapper">
        <h2 style={{ textAlign: "center" }}>Sign in</h2>
        {error}
        <form className="user-form app-form" onSubmit={this.login}>
          <input
            type="text"
            name="email"
            onChange={this.changeUserInput}
            value={this.state.user.email}
            className="app-input user-form__email"
            placeholder="Email"
          />
          <input
            type="password"
            name="password"
            onChange={this.changeUserInput}
            value={this.state.user.password}
            className="app-input user-form__password"
            placeholder="Password"
          />
          <button type="submit" className="btn btn-form user-form__submit">
            Login
          </button>
        </form>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    error: state.user.error,
    loading: state.loading.loading
  };
};
const mapDispatchToProps = {
  userLogin,
  userIsLogin,
  userError,
  showSpinner
};
export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(SignIn)
);
