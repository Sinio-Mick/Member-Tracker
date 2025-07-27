import { GOT_CLUBS } from '../constants/ActionTypes';

export default function(state = null, action) {
    switch(action.type) {
        case GOT_CLUBS:
            return true;
    }

    return state;
}