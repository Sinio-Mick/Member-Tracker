import React, { Component } from "react";
import { connect } from 'react-redux';

class MemberInformationContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    componentDidMount() {
        $(document).ready(function(){
            $('select').material_select();
        });
    }

    renderClubs = () => {
        if (this.props.activeMember.clubs != null)
        {
            return this.props.activeMember.clubs.map(club => {
                return (
                    <div className="col s6" key={club.club_id}>
                        <p>
                            <a style={{display: "block", color: "white"}}>{club.name}</a>
                            <span style={{color: "white", fontSize: 10}}>Club ID: {club.club_id}</span>
                        </p>
                    </div>
                );
            });
        }

        return null;
    }

    
    render() {
       return (
           <div>
            <div className="row">
                <div className="col s12">
                        <div className="card red lighten-2">
                            <div className="card-content white-text">
                                <div className="row" style={{marginBottom: 5}}>
                                <div className="col s6">
                                    <h4>Personal Details</h4>
                                    <p>Member ID: {this.props.activeMember.member_id}</p>
                                    <p>Name: {this.props.activeMember.name}</p>
                                    <p>Gender: {this.props.activeMember.sex}</p>
                                </div>
                                <div className="col s6">
                                    <h4>Contact Information</h4>
                                    <p>Email: {this.props.activeMember.email}</p>
                                    <p>Phone Number: {this.props.activeMember.phone}</p>
                                </div>
                            </div>
                        </div>
                    </div> 
                     <div className="card red lighten-2">
                        <div className="card-content white-text">
                            <div className="row">
                                <div className="col s12">
                                    <h4>SwinFreeze Club Memberships</h4>
                                </div>
                                    {this.renderClubs()}
                            </div>
                        </div>
                    </div> 
                </div>
            </div>
        <div className="row">
          <div className="fixed-action-btn toolbar">
            <a className="btn-floating btn-large red">
              <i className="large material-icons">mode_edit</i>
            </a>
            <ul>
              <li className="waves-effect waves-light">
                <a className="btn tooltipped" data-position="top" data-delay="50" data-tooltip="Add Club" href="#!">
                  <i className="material-icons">group_add</i>
                </a>
              </li>
              <li className="waves-effect waves-light">
                <a className="btn tooltipped" data-position="top" data-delay="50" data-tooltip="Download Club List" href="#!">
                  <i className="material-icons">get_app</i>
                </a>
              </li>
              <li className="waves-effect waves-light">
                <a className="btn tooltipped" data-position="top" data-delay="50" data-tooltip="Remove Club" href="#!">
                  <i className="material-icons">delete</i>
                  </a>
                </li>
              <li className="waves-effect waves-light">
                <a className="btn tooltipped" data-position="top" data-delay="50" data-tooltip="Information" href="#!">
                  <i className="material-icons">info_outline</i>
                </a>
              </li>
            </ul>
          </div>
      </div>
      </div>
        );
    }
}

const styles = {
  container: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-around",
    textAlign: "center"
  }
};

function mapStateToProps(state) {
    return {
        activeMember: state.activeMemberData
    };
}

export default connect(mapStateToProps)(MemberInformationContainer);
