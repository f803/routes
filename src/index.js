import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Link, Switch, Route, Redirect } from "react-router-dom";

import "./styles.css";

function App() {
  return (
    <div className="App">
      <Layout />
    </div>
  );
}

function Layout() {
  return (
    <div className="Layout">
      <Header />

      <main>
        <Switch>
          <Route exact path="/" component={MainPage} />
          <Route path="/sign-in" component={SignInPage} />
          <Route path="/profile" component={ProfilePage} />
        </Switch>
      </main>
    </div>
  );
}

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    localStorage.clear();
  }

  render() {
    return (
      <div className="Header">
        <Link to="/">
          <button>Home</button>
        </Link>
        <Link to="/sign-in">
          <button>Sign In</button>
        </Link>

        <Link to="/profile">
          <button>My Profile</button>
        </Link>

        <button onClick={this.handleClick}>Log out</button>
      </div>
    );
  }
}

class MainPage extends React.Component {
  render() {
    const login = localStorage.getItem("user_login");
    if (login === null)
      return (
        <div className="MainPage">
          <h1>Hello, Stranger</h1>
        </div>
      );
    else
      return (
        <div className="MainPage">
          <h1>Hello, {login}</h1>
        </div>
      );
  }
}

class SignInPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = { logged_in: false };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    const login = document.forms[0].login.value;
    const password = document.forms[0].password.value;

    localStorage.clear();
    localStorage.setItem("user_login", login);
    localStorage.setItem("user_password", password);

    this.setState({ logged_in: true });
  }

  render() {
    if (this.state.logged_in) return <Redirect to="/" />;
    else
      return (
        <div className="SignInpPage">
          <form>
            <br />
            <br />
            <input
              type="text"
              name="login"
              placeholder="Enter your login here"
              size="20"
            />
            <br />
            <br />
            <input
              type="password"
              name="password"
              placeholder="Enter your password here"
              size="20"
            />
            <br />
            <br />
            <button onClick={this.handleClick}>Log in</button>
          </form>
        </div>
      );
  }
}

class ProfilePage extends React.Component {
  render() {
    const login = localStorage.getItem("user_login");
    if (login === null) return <Redirect to="/sign-in" />;
    else {
      const password = localStorage.getItem("user_password");
      return (
        <div className="ProfilePage">
          <h2>Profile Information:</h2>
          <h3>Login: {login}</h3>
          <h3>Password: {password}</h3>
          <h6>Don't tell your password to anyone</h6>
        </div>
      );
    }
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  rootElement
);
