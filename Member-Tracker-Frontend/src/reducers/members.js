import { GOT_MEMBERS } from '../constants/ActionTypes';

export default function(state = null, action) {
    switch(action.type) {
        case GOT_MEMBERS:
            return action.payload.data;
    }

    return state;
}