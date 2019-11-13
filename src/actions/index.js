import { LOGIN, LOGOUT, FETCH_NEW, FETCH_FIN, NO_DOCS } from './types';
import { baseURL } from '../components/serverURL';
import Axios from 'axios';

export const login = loginData => {
    return {
        type: LOGIN,
        payload: loginData
    };
};

export const logout = () => {
    return {
        type: LOGOUT
    };
};

export const fetchDocuments = (userId, role, status) => async dispatch => {
    const docs = await Axios.get(`${baseURL}/upload`, {
        params: {
            userId,
            role,
            status
        }
    });
    //docs.data is an array
    //if no docs, dispatch NO_DOCS to reset docs state to empty array
    if (!docs.length) {
        dispatch({ type: NO_DOCS, paylod: docs });
    }
    if (status === 24) {
        //finished docs
        dispatch({ type: FETCH_FIN, payload: docs.data });
    }
    //new documents
    dispatch({ type: FETCH_NEW, payload: docs.data });
};
