import React, { Component } from "react";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { loggedOut } from '../actions/index';
import { Link } from "react-router-dom";

class SettingsContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
    };
  }

  render() {
    return (
        <div className="row">
          <div className="col s12">
            <div className="card red lighten-2">
              <div className="card-content white-text" style={{fontSize: 12}}>
                <span className="card-title" style={{fontSize: 18, lineHeight: 1.4}}>Currently Logged in as: {this.props.user.user_metadata.user_name}</span>
                <p><span>Permissions: {this.props.user.app_metadata.app_permission}</span><span style={{paddingLeft: 50}}>Email: {this.props.user.email}</span><br/></p>
                <p>Email Verified: Yes<br/><br/></p>
                <p><Link to="/" className="waves-effect waves-light grey btn" onClick={() => this.props.loggedOut()}>Log out</Link></p>
              </div>
            </div>
          </div>
        </div>
    );
  }
}

const styles = {
  container: {
    display: "flex",
    flexDirection: "column"
  },
  pointer: {
    cursor: "pointer"
  }
};

function mapStateToProps(state) {
    return {
        user: state.loginData
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({loggedOut}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(SettingsContainer);