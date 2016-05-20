import {LIST_GROUPS_SUBMIT, LIST_GROUPS_SUCCESS, LIST_GROUPS_FAIL} from '../constants/userTypes';

function listGroups(data) {
    return dispatch => {
        dispatch({
            type: LIST_GROUPS_SUBMIT
        });
        data.im.listGroups(data.userId, (err, res)=> {
            if (err) {
                dispatch(listGroupsFail());
            } else {
                dispatch(listGroupsSuccess(res));
            }
        }, true)
    }
}

function listGroupsSuccess(data){
    return {
        type: LIST_GROUPS_SUCCESS,
        data
    }
}

function listGroupsFail(){
    return {
        type: LIST_GROUPS_FAIL
    }
}

export {
    listGroups
}