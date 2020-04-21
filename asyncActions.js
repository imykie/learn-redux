const redux = require('redux');
const thunk = require('redux-thunk').default; // .default to be added, because of redux-thunk version 2.x
// redux thunk allows an action creator to return a function instead of an action, the function can then be used to perform asynchronous tasks
// and takes in dispatch and getState as its parameters

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

// accepts dispatch and getState as argument, can also accept multiple arguments by passing
// thunk.withExtraArgument(parameterName) or thunk.withExtraArgument({ parameter1, parameter2 }) to applyMiddleware()

const fetchUsers = () => {
    return function(dispatch){
        dispatch(fetchUserRequest())
        axios.get('https://jsonplaceholder.typicode.com/users')
            .then(response => {
                const user = response.data.map(user => {
                        return {
                            id: user.id,
                            name: user.name
                        } 
                    })
                dispatch(fetchUserSuccess(user))
            })
            .catch(error => {
                dispatch(fetchUserFailure(error.message))
            })
    }
}

const store = createStore(reducer, applyMiddleware(thunk))

store.subscribe(() => { console.log(store.getState() )})

store.dispatch(fetchUsers())

// run with "node ./asyncActions" or "node asyncActions" from root directory