import {REHYDRATE} from 'redux-persist/constants';

import * as types from '../actions/actionTypes';

const initialState = {
};

export default function coreReducer(state = initialState, action = {}) {
    var user
    if (action.path && action.method && action.status === 'COMPLETE') {
        switch (action.type) {
            case types.SIGN_IN:
            case types.SIGN_UP:
                return {
                    ...state,
                    auth: action.response.user
                }
            case types.LOG_OUT:
                return {
                    ...state,
                    auth: false
                }
            
            default:
              return {
                  ...state,
                  ...action.response
              }

        }
        
    } else {
        switch (action.type) {
            case REHYDRATE:
                const core = action.payload.core
                if(core)
                    return {...state, ...core}
                else
                    return state
            case types.SET_USER:
                user = action.data
                console.log(user)
                return {
                    ...state,
                    user
                };
            case types.UPDATE_USER:
                user = {...state.user, ...action.data}
                return {
                    ...state,
                    user
                };
            default:
                return state;
        }
    }
}
