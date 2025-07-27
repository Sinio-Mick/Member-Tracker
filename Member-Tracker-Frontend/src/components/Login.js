import React, { Component } from "react";

const Login  = ({updateUser, updatePass, auth_login, email, pass, error_msg}) => (
            <div style={styles.container}>
                <div className="row">
                    <div className="card">
                        <div className="card-content">
                            <span className="card-title" style={styles.centertext}>Login SwinFreeze</span>
                                <div className="row">
                                <div className="input-field col s12">
                                    <input id="Email" type="email" className="validate" onChange={updateUser} data-length="40"/>
                                    <label htmlFor="Email">Email</label>
                                </div>
                            </div>
                            <div className="row">
                                <div className="input-field col s12">
                                    <input id="password" type="password" className="validate" onChange={updatePass} data-length="40"/>
                                    <label htmlFor="password">Password</label>
                                </div>
                            </div>
                        </div>
                        <div className="card-action" style={{paddingTop: 10}}>
                            <div style={{paddingBottom: 30}}>
                                <span>
                                    <a className="waves-effect waves-light red btn" style={{float: "right", marginLeft: 15}} onClick={() => {auth_login(email, pass)}}><i className="material-icons right">input</i>Login</a>
                                </span>
                                <span>
                                    <a className="waves-effect waves-light grey btn" style={{float: "right"}}>Forgot Details</a>
                                </span>
                            </div>
                        </div>
                    </div>
                    <span style={{color: "red"}}>{error_msg}</span>
                </div>
            </div>
        );


const styles = {
  container: {
    height: "100%",
    width: "50%",
    margin: "auto",
    float: "center",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-around"
  },
  centertext: {
    textAlign: "center"
  }
};

export default Login;