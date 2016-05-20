import store from 'store2';
import { browserHistory } from 'react-router';
import {LOGIN_SUBMIT, LOGIN_SUCCESS, LOGIN_FAIL, IM_AUTH_DATA} from '../constants/authTypes';
import {GET_SELFINFO_SUBMIT,GET_SELFINFO_SUCCESS} from '../constants/userTypes';
import {SET_SELFINFO_SUBMIT,SET_SELFINFO_SUCCESS} from '../constants/userTypes';
import {alertSuccess, alertError} from './alertInfo';
import {showSpin, hideSpin} from './spin';
/**
 * 登录
 */
function login(data){
    return dispatch => {
        dispatch({
            type: LOGIN_SUBMIT
        });
        dispatch(showSpin());
        let im;

        return im = ML.im(data, function(res){
            if(res.success === true){
                dispatch(loginSuccess({
                    im: im,
                    id: res.id
                }));
                data.userId = res.id;
                store.set(IM_AUTH_DATA, data);
                browserHistory.replace('/chat');
                dispatch(alertSuccess('登录成功'));

            }else{
                dispatch(alertError(JSON.stringify({errorMessage: '登录失败,请稍后再试...'})));
                dispatch(loginFail());
            }
            dispatch(hideSpin());
        })
    }
}

function loginSuccess(data){
    return {
        type: LOGIN_SUCCESS,
        im: data.im,
        userId: data.id
    }
}

function loginFail(){
    return {
        type: LOGIN_FAIL
    }
}

/**
 * 注销
 */
function logout(data){
    return dispatch => {
        store.remove(IM_AUTH_DATA);
        window.location.href='/'
    }
}

/**
 * 获取自己的信息
 */
function getSelfInfo(data){
    return dispatch => {
        dispatch({
            type: GET_SELFINFO_SUBMIT
        });
        dispatch(showSpin());

        data.im.userInfo(data.id, (err, res)=> {
            res.id = data.id;
            dispatch(getSelfInfoSuccess(res))
            dispatch(hideSpin());
        });
    }
}

function getSelfInfoSuccess(data){
    return {
        type: GET_SELFINFO_SUCCESS,
        data
    }
}

/**
 * 设置自己的信息
 */
function setSelfInfo(data){
    return dispatch => {
        dispatch({
            type: SET_SELFINFO_SUBMIT
        });

        data.im.setUserAttributes(data.id, data.attributes, (err, res)=> {
            if (err) {
                dispatch(alertError(err));
            }else{
                dispatch(alertSuccess('更新名片成功'));
                dispatch(setSelfInfoSuccess(res))
            }
        });
    }
}

function setSelfInfoSuccess(data){
    return {
        type: SET_SELFINFO_SUCCESS,
        data
    }
}

export {
    login,
    logout,
    getSelfInfo,
    setSelfInfo
}