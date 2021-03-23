import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import SearchPage from "./pages/SearchPage";
import getClientId from "./temp.js";

class App extends React.Component {
  state = { isSignedIn: false };

  componentDidMount() {
    window.gapi.load("client:auth2", () => {
      window.gapi.client
        .init({
          clientId: getClientId(),
          scope: "email",
        })
        .then(() => {
          this.auth = window.gapi.auth2.getAuthInstance();
          this.setState({ isSignedIn: this.auth.isSignedIn.get() });
          this.auth.isSignedIn.listen(this.onAuthChange);
        });
    });
  }

  onAuthChange = () => {
    this.setState({ isSignedIn: this.auth.isSignedIn.get() });
  };

  onSignIn = (history) => {
    this.auth.signIn().then(() => {
      history.push("/search");
    });
  };

  onSignOut = (history) => {
    this.auth.signOut().then(() => {
      history.push("/");
    });
  };

  render() {
    return (
      <BrowserRouter>
        <Switch>
        <Route
            exact
            path="/"
            render={(props) => (
              <LoginPage {...props} isSignedIn={this.state.isSignedIn} onSignInClick={this.onSignIn} />
            )}
          />
          <Route
            exact
            path="/search"
            render={props => (
              <SearchPage {...props} isSignedIn={this.state.isSignedIn} onSignOutClick={this.onSignOut} />
            )}
          />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
