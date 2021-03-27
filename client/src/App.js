import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import axios from 'axios';
import LoginPage from "./pages/LoginPage";
import SearchPage from "./pages/SearchPage";
import SavedPage from "./pages/SavedPage";
import Navbar from "./components/Navbar";
import backgroundImage from "./images/book-background.jpg";
import './App.css';

class App extends React.Component {
  state = { isSignedIn: null, userId: null };

  getClientId = async () => {
    try {
      const { data } = await axios.get("/api/clientid");
      this.setAuth(data.id);
    } catch (error) {
      console.log(error);
    }
  }

  setAuth = (clientId) => {
    window.gapi.load("client:auth2", () => {
      window.gapi.client
        .init({
          clientId: process.env.REACT_APP_CLIENT_ID,
          scope: "email",
        })
        .then(() => {
          this.auth = window.gapi.auth2.getAuthInstance();
          this.setState({
            isSignedIn: this.auth.isSignedIn.get(),
            userId: this.auth.currentUser.get().getId(),
          });
          this.auth.isSignedIn.listen(this.onAuthChange);
        });
    });
  }

  componentDidMount() {
    this.getClientId();
  }

  onAuthChange = () => {
    this.setState({
      isSignedIn: this.auth.isSignedIn.get(),
      userId: this.auth.currentUser.get().getId(),
    });
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
      <div style={{minHeight: "100vh",
      backgroundImage: `url(${backgroundImage})`,
      backgroundSize: "cover",
      backgroundRepeat: "no-repeat",
      backgroundAttachment: "fixed",
      overflow: 'scroll'}}>
        <BrowserRouter>
          <Route
            path="/"
            render={(props) => (
              <Navbar
                {...props}
                isSignedIn={this.state.isSignedIn}
                onSignOutClick={this.onSignOut}
              />
            )}
          />

          <Switch>
            <Route
              exact
              path="/"
              render={(props) => (
                <LoginPage
                  {...props}
                  isSignedIn={this.state.isSignedIn}
                  onSignInClick={this.onSignIn}
                />
              )}
            />
            <Route
              exact
              path="/search"
              render={(props) => (
                <SearchPage
                  {...props}
                  isSignedIn={this.state.isSignedIn}
                  userId={this.state.userId}
                  onSignOutClick={this.onSignOut}
                />
              )}
            />
            <Route
              exact
              path="/saved"
              render={(props) => (
                <SavedPage
                  {...props}
                  isSignedIn={this.state.isSignedIn}
                  userId={this.state.userId}
                  onSignOutClick={this.onSignOut}
                />
              )}
            />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
