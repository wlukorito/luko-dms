import { FETCH_NEW, NO_DOCS } from '../actions/types';

//state is an array: action.payload is also an array
export default (state = [], action) => {
    switch (action.type) {
        case FETCH_NEW:
            return [...state, ...action.payload];
        case NO_DOCS:
            return []; //if no docs returned, set state to empty array: RESET STATE
        default:
            return state;
    }
};
