import { ACTIVE_MEMBER } from '../constants/ActionTypes';

export default function(state = null, action) {
    switch(action.type) {
        case ACTIVE_MEMBER:
            return action.payload;
    }

    return state;
}