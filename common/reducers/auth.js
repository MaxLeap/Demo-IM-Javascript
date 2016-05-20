import Immutable from 'immutable';
import {LOGIN_SUBMIT, LOGIN_SUCCESS, LOGIN_FAIL} from '../constants/authTypes';

const initialState = Immutable.Map({
    visible: true,
    confirmLoading: false,
    loginFail: false,
    loginSuccess: false
});
export default (state = initialState, action) => {
    switch (action.type) {
        case LOGIN_SUBMIT:
            return state.set('confirmLoading', true);
        case LOGIN_SUCCESS:
            return state.set('visible', false).set('confirmLoading', false).set('loginFail', false).set('loginSuccess', true);
        case LOGIN_FAIL:
            return state.set('visible', true).set('confirmLoading', false).set('loginFail', true).set('loginSuccess', false);
        default:
            return state;
    }
}