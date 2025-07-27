import axios from 'axios';
import { GOT_CLUBS, GOT_MEMBERS, USER_LOGIN, ACTIVE_MEMBER, ACTIVE_CLUB, USER_LOGOUT } from '../constants/ActionTypes';

const HTTP_URL = "https://ancient-cliffs-40573.herokuapp.com";
const AUTH_URL = "https://swinfitness.au.auth0.com/api/v2/";

export function getClubs() {
  const Request = axios.get(HTTP_URL + '/Clubs')
              
  return {
    type: GOT_CLUBS,
    payload: Request
  };
}

export function getMembers() {
  const Request = axios.get(HTTP_URL + '/Members')
              
  return {
    type: GOT_MEMBERS,
    payload: Request
  };
}

export function setActiveMember(member) {  
  return {
    type: ACTIVE_MEMBER,
    payload: member
  };
}

export function setActiveClub(club) {  
  return {
    type: ACTIVE_CLUB,
    payload: club
  };
}

export function loggedIn(authResult, loggedUser) {
 let config = {'authorization': 'Bearer ' + authResult.idToken};
 const Request = axios.get('https://swinfitness.au.auth0.com/api/v2/users/' + loggedUser.sub, {headers: config});

  return {
    type: USER_LOGIN,
    payload: Request
  };
}

export function loggedOut() {
  return {
    type: USER_LOGOUT,
    payload: null
  };
}