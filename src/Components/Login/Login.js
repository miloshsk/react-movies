import React, { Component } from "react";
import "./login.sass";
import connect from "react-redux/es/connect/connect";
import { userLogin } from "../../actions/userActions";

class Login extends Component {
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
    this.props.userLogin(this.state.user);
  };
  render() {
    const error = this.props.error.isWarning ? (
      <p className="warning-msg">{this.props.error.message}</p>
    ) : null;
    return (
      <div>
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
    error: state.user.error
  };
};
export default connect(
  mapStateToProps,
  { userLogin }
)(Login);
