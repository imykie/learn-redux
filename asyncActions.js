const redux = require('redux');
const { createStore } = redux;

//state
const initialState = {
    loading: false,
    users: [],
    error: ''
}

//action types
const FETCH_USERS_REQUEST = 'FETCH_USERS_REQUEST';
const FETCH_USERS_SUCCESS = 'FETCH_USERS_SUCCESS';
const FETCH_USERS_ERROR = 'FETCH_USERS_ERROR';

//action creators

const fetchUserRequest = () => {
    return {
        type: FETCH_USERS_REQUEST
    }
}

const fetchUserSuccess = () => {
    return {
        type: FETCH_USERS_SUCCESS,
        payload: users
    }
}

const fetchUserFailure = () => {
    return {
        type: FETCH_USERS_ERROR,
        payload: error
    }
}

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case FETCH_USERS_REQUEST: 
            return {
                ...state,
                loading: true
            }

        case FETCH_USERS_SUCCESS:
            return {
                loading: false,
                users: action.payload
            }

        case FETCH_USERS_ERROR:
            return {
                loading: false,
                users: [],
                error: action.payload
            }
    }
}

const store = createStore(reducer)