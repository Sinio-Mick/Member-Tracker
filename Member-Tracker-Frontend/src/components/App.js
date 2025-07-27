import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import { Redirect } from 'react-router';
import auth0 from 'auth0-js';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import rootReducer from '../reducers/index';
import ReduxPromise from 'redux-promise';
import { Provider } from 'react-redux';

import Header from "./Header";
import Clubs from "../containers/Clubs-Container";
import ClubInformation from '../containers/Club_Information-Container';
import Members from "../containers/Members-Container";
import MemberInformation from "../containers/Member_Information-Container";
import Settings from "../containers/Settings-Container";
import Login from "../containers/Login-Container";

const createStoreWithMiddleware = applyMiddleware(ReduxPromise)(createStore);

const INITIAL_STATE = {

  activeMember: null,
  activeUser: null,
  redirect: "",
  messaged: false
};

class App extends Component {
  static defaultProps = {
  };

  componentDidMount() {
  }

  constructor(props) {
    super(props);
    this.state = INITIAL_STATE;
  }

  readMessage = () => {
    this.setState({messaged: true});
  }

  deleteMember = member => {
    this.setState({
      members: this.state.members.filter(item => item.id !== member.id)
    });
  };

  handleDataReset = () => {
    this.setState({ ...INITIAL_STATE });
  };

  handleActivation = Member => {
    this.setState({activeMember: Member});
    console.log("clicked work");
  };

  handleActivation = Member => {
    this.setState({activeMember: Member});
    console.log("clicked work");
  };

  render() {
    const { activeMember, redirect, messaged } = this.state;

    return (
      <Provider store={createStoreWithMiddleware(rootReducer)}>
      <div>
        <Header />
        <div style={styles.container}>
          <Switch>
          <Route
              exact
              path="/"
              render={() => (
                <Login
                  redirect
                />
              )}
            />
            <Route
              path="/Clubs"
              render={() => (
                <Clubs
                  messaged={messaged}
                  readMessage={this.readMessage}
                />
              )}
            />
            <Route
              path="/clubInformation"
              render={() => (
                <ClubInformation/>
              )}
            />
            <Route
              path="/memberInformation"
              render={() => (
                <MemberInformation
                  activeMember={activeMember}
                />
              )}
            />
            <Route
              path="/Members"
              render={() => (
                <Members
                  deleteMember={this.deleteMember}
                  onTaskActivate={this.handleActivation}
                />
              )}
            />
            <Route
              path="/settings"
              render={() => (
                <Settings
                  handleDataReset={this.handleDataReset}
                />
              )}
            />
          </Switch>
        </div>
      </div>
      </Provider>
    );
  }
}

const styles = {
  container: {
    height: "88vh"
  }
};

export default App;
