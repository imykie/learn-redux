const redux = require('redux');
const reduxThunk = require('redux-thunk').default; // .default to be added, because of redux-thunk version 2.x
// redux thunk allows an action creator to return a function instead of an action, the function can then be used to perform asynchronous tasks
const axios = require('axios');
const { createStore, applyMiddleware } = redux;

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

const fetchUserSuccess = users => {
    return {
        type: FETCH_USERS_SUCCESS,
        payload: users
    }
}

const fetchUserFailure = error => {
    return {
        type: FETCH_USERS_ERROR,
        payload: error
    }
}

//reducer function
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

const fetchUsers = () => {
    return function(dispatch){
        dispatch(fetchUserRequest())
        axios.get('https://jsonplaceholder.typicode.com/users')
            .then(response => {
                const user = response.data.map(user => user.id)
                dispatch(fetchUserSuccess(user))
            })
            .catch(error => {
                dispatch(fetchUserFailure(error.message))
            })
    }
}

const store = createStore(reducer, applyMiddleware(reduxThunk))

store.subscribe(() => { console.log(store.getState() )})

store.dispatch(fetchUsers());

// run with "node ./asyncActions" or "node asyncActions" from root directory