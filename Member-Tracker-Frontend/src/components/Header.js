import React, { Component } from "react";

import { Link } from "react-router-dom";
import { connect } from 'react-redux';

class Header extends Component {
  constructor(props) {
    super(props);

    this.state = {
    };
  }

  render() {
    if (this.props.user == null)
    {
      return (
        <nav className="nav-extended">
          <div className="nav-wrapper red">
            <span className="left brand-logo">
              <span className="swingym-logo" style={{marginLeft: 15}}>SwinFreeze University</span>
            </span>
            <ul id="nav-mobile" className="right nav-items">
            </ul>
          </div>
        </nav>
      )
    }
      return (
         <nav className="nav-extended">
          <div className="nav-wrapper red">
            <Link to="/Clubs" className="left brand-logo">
              <span className="swingym-logo" style={{marginLeft: 15}}>SwinFreeze University</span>
            </Link>
            <ul id="nav-mobile" className="right nav-items">
              <li>
                <Link to="/Clubs">Clubs</Link>
              </li>
              <li>
                <Link to="/Members">All Members</Link>
              </li>
              <li>
                <Link to="/settings" style={{ cursor: "pointer" }}>
                  <i className="material-icons">settings</i>
                </Link>
                </li>
            </ul>
          </div>
        </nav>
    );
  }
};

function mapStateToProps(state) {
    return {
        user: state.loginData
    };
}


export default connect(mapStateToProps)(Header);