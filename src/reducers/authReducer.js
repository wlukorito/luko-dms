import { LOGOUT, LOGIN } from '../actions/types';

//userData is object: {userId: String, token: String, role: String, menu: [Strngs]}
//initialize state to data in sessionStorage or null
const INITIAL_STATE = {
    isSignedIn: sessionStorage.getItem('signedIn') || null,
    userData: JSON.parse(sessionStorage.getItem('userData')) || null
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case LOGIN: {
            //persist auth data in sessionStorage
            sessionStorage.setItem('signedIn', true);
            sessionStorage.setItem('userData', JSON.stringify(action.payload));
            return { ...state, isSignedIn: true, userData: action.payload };
        }
        case LOGOUT: {
            //clear auth data in sessionStorage
            sessionStorage.clear();
            return { ...state, isSignedIn: false, userData: null };
        }
        default:
            return state;
    }
};
