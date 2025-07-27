import React, { Component } from "react";
import { connect } from 'react-redux';
import { Link } from "react-router-dom";
import { getMembers, setActiveMember } from '../actions/index';
import { bindActionCreators } from 'redux';

class MembersContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentPage: 1
        };
        
        this.handleClick = this.handleClick.bind(this);
    }

    componentDidMount() {
        this.props.getMembers();
    }

    handleUpClick() {
        if (this.state.currentPage < Math.ceil(this.props.members.length / 8))
        {
            const update = this.state.currentPage + 1;
            this.setState({currentPage: update});
        }
    }

    handleDownClick() {
        if (this.state.currentPage > 1)
        {
            const update = this.state.currentPage - 1;
            this.setState({currentPage: update});
        }
    }

    handleClick(event) {
        this.setState({currentPage: Number(event.target.id)});
    }

    render() {

        var renderMembers = "";
        var renderNumbering = "";

        if (this.props.members != null)
        {
            const indexOfLastMember = this.state.currentPage * 8;
            const indexOfFirstMember = indexOfLastMember - 8;
            const currentMembers = this.props.members.slice(indexOfFirstMember, indexOfLastMember);

            renderMembers = currentMembers.map(member => {
                return (
                    <tr key={member.member_id}> 
                    <td>{member.member_id}</td>
                    <td><Link to="/memberInformation" onClick={() => this.props.setActiveMember(member)}>{member.name}</Link></td>
                    <td>{member.email}</td>
                    <td>{member.phone}</td>
                    <td>{member.status}</td>
                    </tr>
                );
            });

            const pageNumbers = [];
            for (let i = 1; i <= Math.ceil(this.props.members.length / 8); i++) {
                pageNumbers.push(i);
            }
        
            renderNumbering = pageNumbers.map(number => {
                return (<li className="waves-effect" key={number}><a id={number} onClick={this.handleClick}>{number}</a></li>);
            });
        }

        return (
            <div className="row">
        <div className="col s12">
          <table>
            <thead>
              <tr>
                  <th>Member ID</th>
                  <th>Full Name</th>
                  <th>Email Address</th>
                  <th>Phone Number</th>
              </tr>
            </thead>
            <tbody>
              {renderMembers}
            </tbody>
          </table>
          <div className="row" style={{position: "releavtive"}}>
            <div className="col s4 offset-s8">
              <ul className="pagination">
                <li className="disabled"><a onClick={() => this.handleDownClick()}><i className="material-icons">chevron_left</i></a></li>
                {renderNumbering}                
                <li className="waves-effect"><a onClick={() => this.handleUpClick()}><i className="material-icons">chevron_right</i></a></li>
              </ul>
            </div>
          </div>
        </div>
      </div>              
        );
    }
}

const styles = {
  container: {
    height: "100%",
    overflow: "scroll"
  },
  pointer: {
    cursor: "pointer"
  }
};

function mapDispatchToProps(dispatch) {
    return bindActionCreators({getMembers, setActiveMember}, dispatch);
}

function mapStateToProps(state) {
    console.log(state.memberData);
    return {
        members: state.memberData
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(MembersContainer);
