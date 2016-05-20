import {ADD_FRIEND_SUBMIT, ADD_FRIEND_SUCCESS, ADD_FRIEND_FAIL} from '../constants/userTypes';
import {GET_FRIENDINFO_SUBMIT, GET_FRIENDINFO_SUCCESS, GET_FRIENDINFO_FAIL} from '../constants/userTypes';
import {RM_FRIEND_SUBMIT, RM_FRIEND_SUCCESS, RM_FRIEND_FAIL} from '../constants/userTypes';
import {listFriends} from './friends';
import {alertSuccess, alertError} from './alertInfo';
import {showSpin, hideSpin} from './spin';
/**
 * 添加好友
 */
function addFriend(data) {
    return dispatch => {
        dispatch({
            type: ADD_FRIEND_SUBMIT
        });
        data.im.addFriend(data.userId, data.id, (err, res)=> {
            if (err) {
                dispatch(alertError(err));
            } else {
                dispatch(alertSuccess('添加好友成功'));
                dispatch(addFriendSuccess());
                dispatch(listFriends(data));
            }
        })
    }
}

function addFriendSuccess() {
    return {
        type: ADD_FRIEND_SUCCESS
    }
}

/**
 * 获取好友信息
 */
function getFriendInfo(data) {
    return dispatch => {
        dispatch({
            type: GET_FRIENDINFO_SUBMIT
        });
        dispatch(showSpin());

        data.im.userInfo(data.id, (err, res)=> {
            res.id = data.id;
            dispatch(getFriendInfoSuccess(res))
            dispatch(hideSpin());
        });
        
    }
}

function getFriendInfoSuccess(data) {
    return {
        type: GET_FRIENDINFO_SUCCESS,
        data
    }
}
function getFriendInfoFail() {
    return {
        type: GET_FRIENDINFO_FAIL
    }
}


/**
 * 删除好友
 */
function rmFriend(data){
    return dispatch => {
        dispatch({
            type: RM_FRIEND_SUBMIT
        });
        dispatch(showSpin());
        data.im.rmFriend(data.data.userId, data.data.friendId, (err, res)=>{
            dispatch(rmFriendSuccess());
            dispatch(listFriends({
                im: data.im,
                userId: data.data.userId
            }));
            dispatch(hideSpin());
        })
    }
}

function rmFriendSuccess(){
    return {
        type: RM_FRIEND_SUCCESS
    }
}

function rmFriendFail(){
    return {
        type: RM_FRIEND_FAIL
    }
}

export {
    addFriend,
    rmFriend,
    getFriendInfo
}