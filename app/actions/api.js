
import { auth, base} from '../firebase'
import {saveUserLocal} from './coreActions'
import * as types from './actionTypes'

export const signUp = (body) => ({
    type: types.SIGN_UP,
    method: 'POST',
    path: '/user',
    body,
});

export const changePassword = (body) => ({
    type: types.CHANGE_PASSWORD,
    method: 'POST',
    path: '/user/change-password',
    body,
});

export const signIn = (body) => ({
    type: types.SIGN_IN,
    method: 'POST',
    path: '/login',
    body,
});

export const signOut = (body) => ({
    type: types.SIGN_OUT,
    method: 'DELETE',
    path: '/logout',
})

export const forgotPassword = (body) => ({
    type: types.FORGOT_PASSWORD,
    method: 'POST',
    path: '/user/forgot-password',
    body,
});
