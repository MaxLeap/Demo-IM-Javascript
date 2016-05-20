import {LIST_FRIENDS_SUBMIT, LIST_FRIENDS_SUCCESS, LIST_FRIENDS_FAIL} from '../constants/userTypes';

function listFriends(data) {
    return dispatch => {
        dispatch({
            type: LIST_FRIENDS_SUBMIT
        });
        data.im.listFriends(data.userId, (err, res)=> {
            if (err) {
                dispatch(listFriendsFail());
            } else {
                dispatch(listFriendsSuccess(res));
            }
        }, true)
    }
}

function listFriendsSuccess(data){
    return {
        type: LIST_FRIENDS_SUCCESS,
        data
    }
}

function listFriendsFail(){
    return {
        type: LIST_FRIENDS_FAIL
    }
}

export {
    listFriends
}