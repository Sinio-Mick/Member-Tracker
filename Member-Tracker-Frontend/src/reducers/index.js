import { combineReducers } from 'redux';
import clubsReducer from './clubs';
import loginReducer from './login';
import memberReducer from './members';
import activeMemberReducer from './activeMember';
import activeClubReducer from './activeClub';
import isClubLoading from './isClubLoading';


const rootReducer = combineReducers({
  clubData: clubsReducer,
  loginData: loginReducer,
  memberData: memberReducer,
  activeMemberData: activeMemberReducer,
  activeClubData: activeClubReducer,
  isloading: isClubLoading 
});

export default rootReducer;