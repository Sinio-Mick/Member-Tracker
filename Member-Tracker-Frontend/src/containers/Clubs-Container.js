import React, { Component } from "react";
import ReactDOM from 'react-dom'; 
import { connect } from 'react-redux';
import { getClubs, setActiveClub } from '../actions/index';
import { bindActionCreators } from 'redux';
import { Link } from "react-router-dom";
import axios from 'axios';

const HTTP_URL = "https://ancient-cliffs-40573.herokuapp.com";

class ClubsContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            clubName: "",
            clubLocation: "",
            clubDescription: "",
            clubCategory: "",
            clubID: "",
            clubs: null,
            setData: false
        };
    
    this.deleteRenderClubs = this.deleteRenderClubs.bind(this);
    this.handleSelectChange = this.handleSelectChange.bind(this);
    this.handleClubSelectChange = this.handleClubSelectChange.bind(this);
    }

    
    componentDidMount() {
        this.props.getClubs();

        $(document).ready(function(){
            console.log("load");
            $('.tooltipped').tooltip({delay: 50});
            $('.modal').modal();
            $('select').material_select();
        });

        $(ReactDOM.findDOMNode(this.refs.catSelect)).on('change',this.handleSelectChange.bind(this));
        $(ReactDOM.findDOMNode(this.refs.clubSelect)).on('change',this.handleClubSelectChange.bind(this));
    }

    componentWillReceiveProps() {
        $(document).ready(function(){
            $('select').material_select();
        });
    }
    
    addClub = () => {
        Materialize.toast('Adding ' + this.state.clubName + ', please wait.', 4000) // 4000 is the duration of the toast

        axios.post(HTTP_URL + '/Clubs', {
            name: this.state.clubName,
            category: this.state.clubCategory,
            description: this.state.clubDescription,
            location: this.state.clubLocation
        })
        .then((response) => {
            this.props.getClubs();
        })
        .catch((error) => {
            console.log(error);
        });
    }

    deleteClub = () => {
        console.log(this.state.clubID);

        axios.delete(HTTP_URL + '/Clubs', {
            params: {club_id: this.state.clubID}
        })
        .then((response) => {
            this.props.getClubs();
        })
        .catch((error) => {
            console.log(error);
        });
    }

    handleSelectChange(event) {
    	event.preventDefault();

     	this.setState({clubCategory: event.target.value});
    }

    handleClubSelectChange(event) {
        event.preventDefault();

     	this.setState({clubID: event.target.value});
    }


    sumbitForm = () => {
        if (this.state.clubName.length == 0 || this.state.clubDescription.length == 0 || this.state.clubLocation.length == 0 || this.state.clubCategory.length == 0)
            return <Link to="/Clubs" className="btn-flat modal-action modal-close waves-effect waves-green btn-flat disabled">Submit</Link>
        else
            return <Link to="/Clubs" className="modal-action modal-close waves-effect waves-green btn-flat" onClick={() => this.addClub()}>Submit</Link>
    }

    deleteRenderClubs = () => {   
        if (this.props.clubs !== null )
        {
            return this.props.clubs.map(club => {
                return (<option key={club.club_id} value={club.club_id}>{club.club_id} - {club.name}</option>);
            });
        }

        return null;
    }

    renderClubs = () => {
        if (this.props.clubs != null)
        {
            return this.props.clubs.map(club => {
                return (
                    <div className='col s4' key={club.club_id}>
                        <div className="card red lighten-2">
                            <div className="card-content white-text" style={{fontSize: 12, minHeight: 180}} >
                                <span className="card-title" style={{fontSize: 18, lineHeight: 1.4}}>{club.name}</span>
                                <p>{club.description}</p>
                            </div>
                            <div className="card-action white">
                                <Link to="/clubInformation" onClick={() => this.props.setActiveClub(club)}>More Club Information</Link>
                            </div>
                        </div>
                    </div>
                );
            });
        }
        return null;
    }

    showLoadingBar = () => {
        if (this.props.isloading !== true)
        {   
            return (<div className="progress">
                <div className="indeterminate"></div>
            </div> );
        }
    }

    render() {

        if (this.props.user !== null && this.props.messaged === false)
        {
            console.log(this.props.user);
            Materialize.toast('Welcome ' + this.props.user.user_metadata.user_name + ' please wait for clubs to be loaded', 4000) // 4000 is the duration of the toast
            this.props.readMessage();
        }

        return (
            <div>      
                <div className="row">
                {this.showLoadingBar()}
                {this.renderClubs()}
                </div>
                <div className="row">
                <div className="fixed-action-btn toolbar">
                    <a className="btn-floating btn-large red">
                    <i className="large material-icons">mode_edit</i>
                    </a>
                    <ul>
                    <li className="waves-effect waves-light">
                        <a className="btn tooltipped modal-trigger" data-position="top" data-delay="50" data-tooltip="Add Club" href="#modal1">
                            <i className="material-icons">group_add</i>
                        </a>
                    </li>
                    <li className="waves-effect waves-light">
                        <a className="btn tooltipped modal-trigger" data-position="top" data-delay="50" data-tooltip="Remove Club" href="#delete">
                            <i className="material-icons">delete</i>
                        </a>
                    </li>
                    <li className="waves-effect waves-light">
                        <a className="btn tooltipped modal-trigger" data-position="top" data-delay="50" data-tooltip="Information" href="#info">
                            <i className="material-icons">info_outline</i>
                        </a>
                    </li>
                    </ul>
                </div>
            </div>
                <div id="modal1" className="modal">
                    <div className="modal-content row">
                        <div className="input-field col s12">
                            <input id="name" type="text" className="validate" data-length="40" onChange={(event) => this.setState({clubName: event.target.value})}/>
                            <label htmlFor="name">Club Name</label>
                        </div>
                        <div className="input-field col s6">
                            <input id="Location" type="text" data-length="40"onChange={(event) => this.setState({clubLocation: event.target.value})}/>
                            <label htmlFor="Location">Location</label>
                        </div>
                        <div className="input-field col s6">
                            <select ref="catSelect">
                                <option value="" disabled selected>Close your option</option>
                                <option value="Sports">Sports</option>
                                <option value="Culture">Culture</option>
                                <option value="Games and Puzzles">Games and Puzzles</option>
                                <option value="Food">Food</option>
                            </select>
                            <label>Club Categories</label>
                        </div>
                        <div className="input-field col s12">
                            <textarea id="Description" className="materialize-textarea" data-length="255" onChange={(event) => this.setState({clubDescription: event.target.value})}></textarea>
                            <label htmlFor="Description">Description</label>
                        </div>
                    </div>       
                    <div className="modal-footer row">
                        {this.sumbitForm()}
                        <Link to="/Clubs" className="modal-action modal-close waves-effect waves-green btn-flat">Cancel</Link>
                    </div>
                </div>
                <div id="info" className="modal">
                    <div className="modal-content row">
                        <p>Made by Mick Sayboualay.</p>
                    </div>       
                    <div className="modal-footer row">
                        <Link to="/Clubs" className="modal-action modal-close waves-effect waves-green btn-flat">Return</Link>
                    </div>
                </div>
                <div id="delete" className="modal">
                    <div className="modal-content row">
                        <div className="input-field col s12">
                            <select ref="clubSelect">
                                <option value="" disabled selected>Select Club to Delete</option>
                                {this.deleteRenderClubs()}
                            </select>
                        </div>
                    </div>       
                    <div className="modal-footer row">
                        <span className="modal-action modal-close waves-effect waves-green btn-flat" onClick={() => this.deleteClub()}>Submit</span>
                        <span className="modal-action modal-close waves-effect waves-green btn-flat">Return</span>
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
    textAlign: "center",
    
  },
  btnAddBottom: {
    position: "absolute",
    bottom:15,
    right:15,
  },
  btnRemoveBottom: {
    position: "absolute",
    bottom:15,
    right:150,
  },
  fullWidth: {
    width: "100%"
  }
};

function mapStateToProps(state) {
    return {
        clubs: state.clubData,
        user: state.loginData,
        isloading: state.isloading
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({getClubs, setActiveClub}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ClubsContainer);
