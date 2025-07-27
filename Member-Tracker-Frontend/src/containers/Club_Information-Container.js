import React, { Component } from "react";
import ReactDOM from 'react-dom'; 
import { connect } from 'react-redux';
import { getMembers, getClubs } from '../actions/index';
import { bindActionCreators } from 'redux';
import axios from 'axios';
import TimePicker from 'react-bootstrap-time-picker';

const HTTP_URL = "https://ancient-cliffs-40573.herokuapp.com";

class ClubInformationContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            memberName: "",
            memberGender: "",
            memberPhone: "",
            memberEmail: "",
            eventName: "",
            eventLocation: "",
            eventDate: "",
            eventTime: "",
            eventDescription: "",
            events: [],
            selectedMemberID: null,
            selectedEventID: null
        };
    }

    componentDidMount() {
        $(document).ready(function(){
            $('.tooltipped').tooltip({delay: 50});
            $('.modal').modal();
            $('select').material_select();
            $('ul.tabs').tabs();
            $('.datepicker').pickadate({
                selectMonths: true, // Creates a dropdown to control month
                selectYears: 15, // Creates a dropdown of 15 years to control year,
                today: 'Today',
                clear: 'Clear',
                close: 'Ok',
                closeOnSelect: false // Close upon selecting a date,
            });
        });

        this.props.getClubs();
        this.props.getMembers();

        $(ReactDOM.findDOMNode(this.refs.genderSelect)).on('change',this.handleSelectChange.bind(this));
        $(ReactDOM.findDOMNode(this.refs.memberSelect)).on('change',this.handleMemberSelectChange.bind(this));
        $(ReactDOM.findDOMNode(this.refs.eventSelect)).on('change',this.handleEventSelectChange.bind(this));
        $(ReactDOM.findDOMNode(this.refs.eventDateRef)).on('change',this.handleEventDateChange.bind(this));
        $(ReactDOM.findDOMNode(this.refs.eventTimeRef)).on('change',this.handleTimeChange.bind(this));

    }

    componentWillReceiveProps() {
        $(document).ready(function(){
            $('select').material_select();
        });
    }

    handleSelectChange(event) {
    	event.preventDefault();
     	this.setState({memberGender: event.target.value});
    }

    handleMemberSelectChange(event) {
    	event.preventDefault();
     	this.setState({selectedMemberID: event.target.value});
    }

    handleEventSelectChange(event) {
    	event.preventDefault();
     	this.setState({selectedEventID: event.target.value});
    }

    handleEventDateChange(event) {
    	event.preventDefault();
     	this.setState({eventDate: event.target.value});
    }

    handleTimeChange(event) {
        this.setState({eventTime: event.target.value});
    }

     submitEventSelectForm = () => {
        if (this.state.selectedEventID == null)
            return <span className="btn-flat modal-action modal-close waves-effect waves-green btn-flat disabled">Submit</span>
        else
            return <span className="modal-action modal-close waves-effect waves-green btn-flat" onClick={() => this.deleteEvent()}>Submit</span>
    }

    sumbitForm = () => {
        if (this.state.memberName.length == 0 || this.state.memberPhone.length == 0 || this.state.memberEmail.length == 0 || this.state.memberGender.length == 0)
            return <span className="btn-flat modal-action modal-close waves-effect waves-green btn-flat disabled">Submit</span>
        else
            return <span className="modal-action modal-close waves-effect waves-green btn-flat" onClick={() => this.addMember()}>Submit</span>
    }

    sumbitSelectForm = () => {
        if (this.state.selectedMemberID == null)
            return <span className="btn-flat modal-action modal-close waves-effect waves-green btn-flat disabled">Submit</span>
        else
            return <span className="modal-action modal-close waves-effect waves-green btn-flat" onClick={() => this.addMemberByID()}>Submit</span>
    }

    addMember = () => {
        Materialize.toast('Adding ' + this.state.memberName + '...', 4000)
        const randNum = Math.floor((Math.random() * 9999999) + 1000000);

        axios.post(HTTP_URL + '/Members', {
            club_id: this.props.club.club_id,
            member_id: randNum,
            name: this.state.memberName,
            phone: this.state.memberPhone,
            email: this.state.memberEmail,
            sex: this.state.memberGender
        })
        .then((response) => {
            this.props.getClubs();
        })
        .catch((error) => {
            console.log(error);
        });
    }

    addMemberByID = () => {
         axios.post(HTTP_URL + '/Members', {
            club_id: this.props.club.club_id,
            member_id: this.state.selectedMemberID
        })
        .then((response) => {
            this.props.getClubs();
        })
        .catch((error) => {
            console.log(error);
        });
    }

    addEvent = () => {
        Materialize.toast('Adding Event: ' + this.state.eventName + ', please wait.', 4000) // 4000 is the duration of the toast

        axios.post(HTTP_URL + '/Event', {
            club_id:this.props.club.club_id,
            name: this.state.eventName,
            location: this.state.eventLocation,
            date: this.state.eventDate,
            time: this.state.eventTime,
            description: this.state.eventDescription
        })
        .then((response) => {
            this.props.getClubs();
        })
        .catch((error) => {
            console.log(error);
        });
    }

    deleteEvent = () => {
        axios.delete(HTTP_URL + '/Event', {
            params: {event_id: this.state.selectedEventID}
        })
        .then((response) => {
            this.props.getClubs();
        })
        .catch((error) => {
            console.log(error);
        });
    }

    renderEvents = () => {
        if (this.props.clubs != null)
        {
            return this.props.clubs.map(existingClub => {
                if (this.props.club.club_id == existingClub.club_id)
                {
                    return existingClub.events.map(event => {
                        return (
                            <div>
                                <h4>{event.name}</h4>
                                <p>Event ID: {event.event_id}</p>
                                <p>Location: {event.location}</p>
                                <p>When: {event.date} at {event.time}</p>
                                <p>Description: {event.description}</p>
                            </div>
                        );
                    });
                }
            }) 
        }
        return null;
    }

    deleteRenderEvent = () => {   
        if (this.props.clubs !== null )
        {
            return this.props.clubs.map(existingClub => {
                if (this.props.club.club_id == existingClub.club_id)
                {
                    return existingClub.events.map(event => {
                        return (<option key={event.event_id} value={event.event_id}>{event.event_id} - {event.name}</option>);

                    })
                }
            });
        }

        return null;
    }

    renderTimePicker = () => {
        const Times = ["12:00 AM","12:30 AM","1:00 AM","1:30 AM","2:00 AM","2:30 AM","3:00 AM","3:30 AM","4:00 AM","4:30 AM", 
                       "5:00 AM","5:30 AM","6:00 AM","6:30 AM","7:00 AM","7:30 AM","8:00 AM","8:30 AM","9:00 AM","9:30 AM",
                       "10:00 AM","10:30 AM","11:00 AM","11:30 AM","12:00 PM","12:30 PM","12:00 PM","12:30 PM","1:00 PM",
                       "1:30 PM","2:00 PM","2:30 PM","3:00 PM","3:30 PM","4:00 PM","4:30 PM","5:00 PM","5:30 PM","6:00 PM",
                       "6:30 PM","7:00 PM","7:30 PM","8:00 PM","8:30 PM","9:00 PM","9:30 PM","10:00 PM","10:30 PM","11:00 PM",
                       "11:30 PM"]
        return Times.map(time => {
            return (<option value={time}>{time}</option>);
        });
    }

    sumbitEventForm = () => {
        if (this.state.eventName.length == 0 || this.state.eventLocation.length == 0 || this.state.eventDate.length == 0 || this.state.eventTime.length == 0 || this.state.eventDescription.length == 0)
            return <span className="btn-flat modal-action modal-close waves-effect waves-green btn-flat disabled">Submit</span>
        else
            return <span className="modal-action modal-close waves-effect waves-green btn-flat" onClick={() => this.addEvent()}>Submit</span>
    }

    renderMembers = () => {
        if (this.props.club != null)
        {
            return this.props.clubs.map(existingClub => {
                if (this.props.club.club_id == existingClub.club_id)
                {
                    return existingClub.membersInfo.map(info => {
                        return (
                            <p>{info}</p>
                        );
                    });
                }
            }) 
        }

        return null;
    }

    renderRanks = () => {
        if (this.props.club != null)
        {
            return this.props.club.ranks.map(rank => {
                return (
                    <ol key={rank.rank_id}>
                        <li>{rank.name}</li>
                    </ol>
                );
            });
        }
        
        return null;
    }

    memberCount = () => {
        if (this.props.clubs != null)
        {
            return this.props.clubs.map(existingClub => {
                if (this.props.club.club_id == existingClub.club_id)
                {
                    return existingClub.membersInfo.length;
                }
            })
        }

        return this.props.club.membersInfo.length;
    }
    
    render() {
        var memberList = null;
        var belongs = false;

        if(this.props.members != null && this.props.club.club_id != null)
        {
            memberList = this.props.members.map(member => {
                member.clubs.map(id => {
                    if (id.club_id == this.props.club.club_id)           
                        belongs = true;
                });

                if (belongs == false) 
                    return (<option key={member.member_id} value={member.member_id}>{member.member_id} - {member.name}</option>);
                else 
                    belongs = false;
                
            });
        }
        

        return (

        <div>
            <div className="row">
                <div className="col s12">
                    <div className="card red lighten-2" style={{marginBottom: 0}}>
                        <div className="card-content white-text" style={{fontSize: 12, paddingBottom: 20, paddingTop: 8}}>
                            <h1 className="card-title" style={{fontSize: 28, lineHeight: 1.4,textAlign: "center", fontWeight: "bold", letterSpacing: 4}}>{this.props.club.name}</h1>
                        </div>
                    </div>
                </div>
                <div className="col s6">
                    <div className="row">
                        <div className="card red lighten-2">
                            <div className="card-content white-text" style={{fontSize: 12}}>
                                <span className="card-title" style={{fontSize: 18, lineHeight: 1.4}}>General Club Information</span>
                                <p>Club ID: {this.props.club.club_id}</p>
                                <p>Members: {this.memberCount()}</p>
                                <p>Location: {this.props.club.location}</p>
                                {/*<span>Club Rank List:
                                    {this.renderRanks()}
                                </span>*/}
                            </div>
                        </div>
                        <div className="card red lighten-2">
                            <div className="card-content white-text" style={{fontSize: 12}}>
                                <span className="card-title" style={{fontSize: 18, lineHeight: 1.4}}>Club Events</span>
                                {this.renderEvents()}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col s6">
                    <div className="card red lighten-2">
                        <div className="card-content white-text" style={{fontSize: 12}}>
                            <span className="card-title" style={{fontSize: 18, lineHeight: 1.4}}>Club Members List</span>
                            {this.renderMembers()}
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
                    <a className="btn tooltipped modal-trigger" data-position="top" data-delay="50" data-tooltip="Add Member" href="#modal1">
                    <i className="material-icons">person_add</i>
                    </a>
                </li>
                <li className="waves-effect waves-light">
                    <a className="btn tooltipped modal-trigger" data-position="top" data-delay="50" data-tooltip="Edit Event" href="#modal2">
                    <i className="material-icons">insert_invitation</i>
                    </a>
                </li>
                <li className="waves-effect waves-light">
                    <a className="btn tooltipped" data-position="top" data-delay="50" data-tooltip="Edit Rank" href="#!">
                    <i className="material-icons">grade</i>
                    </a>
                </li>
                <li className="waves-effect waves-light">
                    <a className="btn tooltipped modal-trigger" data-position="top" data-delay="50" data-tooltip="Remove Member" href="#modal4">
                    <i className="material-icons">delete</i>
                    </a>
                    </li>
                </ul>
            </div>
        </div>
        <div id="modal1" className="modal">
            <div className="row">
            <ul className="tabs">
                <li className="tab col s6"><a className="active" href="#test1">Add New Member</a></li>
                <li className="tab col s6"><a href="#test2">Add Member</a></li>
            </ul>
            </div>
            <div id="test1">
                <div className="modal-content row">
                    <div className="input-field col s6">
                        <input id="name" type="text" className="validate" data-length="40" onChange={(event) => this.setState({memberName: event.target.value})}/>
                        <label htmlFor="name">Member Name</label>
                    </div>
                    <div className="input-field col s6">
                        <select ref="genderSelect">
                            <option value="" disabled selected></option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                            <option value="Other">Other</option>
                        </select>
                        <label>Gender</label>
                    </div>
                    <div className="input-field col s6">
                        <input id="email" type="email" className="validate" data-length="40" onChange={(event) => this.setState({memberEmail: event.target.value})}/>
                        <label htmlFor="email">Email</label>
                    </div>
                    <div className="input-field col s6">
                        <input id="phone" type="number" className="validate" data-length="15" onChange={(event) => this.setState({memberPhone: event.target.value})}/>
                        <label htmlFor="phone">Phone Number</label>
                    </div>
                </div>
                <div className="modal-footer">
                    {this.sumbitForm()}
                    <span className="modal-action modal-close waves-effect waves-green btn-flat">Return</span>
                </div>
            </div>
            <div id="test2">
                <div className="modal-content row">
                    <select ref="memberSelect">
                        <option value="" disabled selected>Select a Member</option>
                        {memberList}
                    </select>
                 </div>
                <div className="modal-footer">
                    {this.sumbitSelectForm()}
                    <span className="modal-action modal-close waves-effect waves-green btn-flat">Return</span>
                </div>         
            </div>
        </div>
        <div id="modal2" className="modal">
             <div className="row" style={{marginBottom: 0}}>
                <ul className="tabs">
                    <li className="tab col s6"><a className="active" href="#addevent">Add New Event</a></li>
                    <li className="tab col s6"><a href="#removeEvent">Remove Event</a></li>
                </ul>
            </div>
            <div id="addevent">
                <div className="modal-content row" style={{marginBottom: 0, paddingBottom: 0}}>
                    <div className="input-field col s6">
                        <input id="name" type="text" className="validate" data-length="40" onChange={(event) => this.setState({eventName: event.target.value})}/>
                        <label htmlFor="name">Event Name</label>
                    </div>
                    <div className="input-field col s6">
                        <input id="location" type="text" className="validate" data-length="40" onChange={(event) => this.setState({eventLocation: event.target.value})}/>
                        <label htmlFor="location">Location</label>
                    </div>
                    <div className="input-field col s6">
                        <input id="eventDate" type="text" className="datepicker" ref="eventDateRef"/>
                        <label htmlFor="eventDate">Date of Event</label>
                    </div>
                    <div className="input-field col s6">
                        <select ref="eventTimeRef">
                            <option value="" disabled selected>Select a Time</option>
                            {this.renderTimePicker()}
                        </select>                            
                    </div>
                    <div className="input-field col s12">
                        <textarea id="Description" className="materialize-textarea" data-length="255" onChange={(event) => this.setState({eventDescription: event.target.value})}></textarea>
                        <label htmlFor="Description">Description</label>
                    </div>
                </div>
                <div className="modal-footer">
                    {this.sumbitEventForm()}
                    <span className="modal-action modal-close waves-effect waves-green btn-flat">Cancel</span>
                </div>         
            </div>
            <div id="removeEvent">
                 <div className="modal-content row">
                    <select ref="eventSelect">
                        <option value="" disabled selected>Select Event to Delete</option>
                        {this.deleteRenderEvent()}
                    </select>
                </div>
                <div className="modal-footer">
                    {this.submitEventSelectForm()}
                    <span className="modal-action modal-close waves-effect waves-green btn-flat">Return</span>
                </div> 
            </div>
        </div>
        
    </div>
        );
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({getMembers, getClubs}, dispatch);
}

function mapStateToProps(state) {
    return {
        clubs: state.clubData,
        club: state.activeClubData,
        members: state.memberData
    };
}


export default connect(mapStateToProps, mapDispatchToProps)(ClubInformationContainer);