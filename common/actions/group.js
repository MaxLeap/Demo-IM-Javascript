import {ADD_GROUP_SUBMIT, ADD_GROUP_SUCCESS, ADD_GROUP_FAIL} from '../constants/userTypes';
import {GET_GROUPINFO_SUBMIT, GET_GROUPINFO_SUCCESS, GET_GROUPINFO_FAIL} from '../constants/userTypes';
import {RM_GROUP_SUBMIT, RM_GROUP_SUCCESS} from '../constants/userTypes';
import {ADD_GROUPMEMBERS_SUBMIT, ADD_GROUPMEMBERS_SUCCESS} from '../constants/userTypes';
import {RM_GROUPMEMBERS_SUBMIT, RM_GROUPMEMBERS_SUCCESS} from '../constants/userTypes';
import {UPDATE_GROUP_SUBMIT, UPDATE_GROUP_SUCCESS} from '../constants/userTypes';
import {listGroups} from './groups';
import {alertSuccess, alertError} from './alertInfo';
import {showSpin, hideSpin} from './spin';
/**
 * 创建群组
 */
function addGroup(data) {
    return dispatch => {
        dispatch({
            type: ADD_GROUP_SUBMIT
        });
        data.im.addGroup(data.data, (err, res)=> {
            if (err) {
                dispatch(alertError(err));
                dispatch(addGroupFail());
            } else {
                dispatch(alertSuccess('创建群组成功'));
                dispatch(addGroupSuccess());
                dispatch(listGroups({
                    userId: data.data.owner,
                    im: data.im
                }));
            }
        })

    }
}

function addGroupFail() {
    return {
        type: ADD_GROUP_FAIL
    }
}

function addGroupSuccess() {
    return {
        type: ADD_GROUP_SUCCESS
    }
}

/**
 * 获取群组信息
 */
function getGroupInfo(data) {
    return dispatch => {
        dispatch({
            type: GET_GROUPINFO_SUBMIT
        });
        dispatch(showSpin());
        data.im.getGroup(data.id, (err, res)=> {
            res.id = data.id;
            dispatch(getGroupInfoSuccess(res));
            dispatch(hideSpin());
        })
    }
}

function getGroupInfoSuccess(data) {
    return {
        type: GET_GROUPINFO_SUCCESS,
        data
    }
}

/**
 * 删除群组
 */
function rmGroup(data) {
    return dispatch =>{
        dispatch({
            type: RM_GROUP_SUBMIT
        });
        dispatch(showSpin());
        data.im.rmGroup(data.groupId, (err, res)=>{
            if (err) {
                dispatch(alertError(err));
            }else{
                dispatch(alertSuccess('解散群组成功'));
                dispatch(rmGroupSuccess());
                dispatch(listGroups({
                    userId: data.userId,
                    im: data.im
                }));
            }
            dispatch(hideSpin());
        })
    }
}

function rmGroupSuccess(data) {
    return {
        type: RM_GROUP_SUCCESS,
        data
    }
}

/**
 * 添加群组成员
 */
function addGroupMembers(data) {
    return dispatch => {
        dispatch({
            type: ADD_GROUPMEMBERS_SUBMIT
        });
        data.im.addGroupMembers(data.groupId, {
            members: data.members
        }, (err, res)=>{
            if (err) {
                dispatch(alertError(err));
            }else{
                dispatch(alertSuccess('增加成员成功'));
                dispatch(getGroupInfo({
                    im: data.im,
                    id: data.groupId
                }))
            }
        })
    }
}

/**
 * 删除群组成员
 */
function rmGroupMembers(data){
    return dispatch => {
        dispatch({
            type: RM_GROUPMEMBERS_SUBMIT
        });
        data.im.rmGroupMembers(data.groupId, {
            members: data.members
        }, (err, res)=>{
            if (err) {
                dispatch(alertError(err));
            }else{
                dispatch(alertSuccess('删除成员成功'));
                dispatch(getGroupInfo({
                    im: data.im,
                    id: data.groupId
                }))
            }
        })
    }
}

/**
 * 更新群组信息
 */
function setGroupAttributes(data){
    return dispatch => {
        dispatch({
            type: UPDATE_GROUP_SUBMIT
        });
        data.im.setGroupAttributes(data.groupId, data.data, (err, res)=>{
            if(err){
                dispatch(alertError(err));
            }else{
                dispatch(alertSuccess('修改成功'));
                dispatch(getGroupInfo({
                    im: data.im,
                    id: data.groupId
                }));
                dispatch(listGroups({
                    userId: data.userId,
                    im: data.im
                }));
            }
        });
    }
}

export {
    addGroup,
    getGroupInfo,
    rmGroup,
    addGroupMembers,
    rmGroupMembers,
    setGroupAttributes
}