import React, { Component } from "react";
import { Link } from "react-router-dom";

const Settings = ({user, logout}) => (
        <div className="row">
          <div className="col s12">
            <div className="card red lighten-2">
              <div className="card-content white-text" style={{fontSize: 12}}>
                <span className="card-title" style={{fontSize: 18, lineHeight: 1.4}}>Currently Logged in as: {user.user_metadata.user_name}</span>
                <p><span>Permissions: {user.app_metadata.app_permission}</span><span style={{paddingLeft: 50}}>Email: {user.email}</span><br/></p>
                <p>Email Verified: Yes<br/><br/></p>
                <p><Link to="/" className="waves-effect waves-light grey btn" onClick={() => this.logout()}>Log out</Link></p>
              </div>
            </div>
          </div>
        </div>
    );


const styles = {
  container: {
    display: "flex",
    flexDirection: "column"
  },
  pointer: {
    cursor: "pointer"
  }
};

export default Settings;
