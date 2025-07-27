import React, { Component } from "react";
import Login from '../components/Login';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { loggedIn } from '../actions/index';
import { Redirect } from 'react-router';
import axios from 'axios';

class LoginContainer extends Component {
    constructor(props) {
    super(props);
    this.state = {
      email: '',
      pass: '',
      redirect: '',
      error_msg: '',
      user: []
    };
    this.auth_login = this.auth_login.bind(this);
  }

    updateUser = (e) => {
        this.setState({email: e.target.value});
    }
    updatePass = (e) => {
        this.setState({pass: e.target.value});
    }

    auth_details = () => {
     var webAuth = new auth0.WebAuth({
            domain: 'swinfitness.au.auth0.com',
            clientID: 'EdCR9CGtEeAlLS7rYN1RU0GZXQITkBt4',
            redirectUri: 'http://localhost:3000/callback',
            audience: 'https://swinfitness.au.auth0.com/userinfo',
            responseType: 'code',
            scope: 'openid email profile app_metadata'
        });

        return webAuth;
    }

    auth_login = (user, pass) =>  {
        var username = user
        var password = pass;
        var webAuth = this.auth_details();

        webAuth.client.login({
          realm: 'SwinFit',
          username: username,
          password: password
        }, (err, authResult) => {
            if (err) {
                console.log(err);
                this.setState({error_msg: err.description});
            } 
            else {
                webAuth.client.userInfo(authResult.accessToken, (err, loggedUser) => {
                    this.props.loggedIn(authResult, loggedUser);
                    this.setState({redirect: "connected"});                    
                });
            }
        });
    }

    render() {        
        if (this.state.redirect === "connected") {
            console.log("Redirecting..");
            return <Redirect to="/Clubs" push/>;
        }

        return (
            <Login
                updateUser={this.updateUser}
                updatePass={this.updatePass}
                auth_login={this.auth_login}
                email={this.state.email}
                pass={this.state.pass}
                error_msg={this.state.error_msg}
            />
        )
    }
}

function mapStateToProps(state) {
    console.log(state.loginData);
    return {
        user: state.loginData
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({loggedIn}, dispatch);
}


export default connect(mapStateToProps, mapDispatchToProps)(LoginContainer);