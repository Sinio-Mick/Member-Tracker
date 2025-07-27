import { ACTIVE_CLUB } from '../constants/ActionTypes';

export default function(state = null, action) {
    switch(action.type) {
        case ACTIVE_CLUB:
            return action.payload;
    }

    return state;
}