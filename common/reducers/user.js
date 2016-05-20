import Immutable from 'immutable';
import {LOGIN_SUCCESS} from '../constants/authTypes';
import {
    ADD_FRIEND_SUBMIT,
    ADD_FRIEND_SUCCESS,
    ADD_FRIEND_FAIL,
    LIST_FRIENDS_SUBMIT,
    LIST_FRIENDS_SUCCESS,
    LIST_FRIENDS_FAIL,
    LIST_GROUPS_SUCCESS
} from '../constants/userTypes';
import {GET_FRIENDINFO_SUBMIT,GET_FRIENDINFO_SUCCESS} from '../constants/userTypes';
import {GET_GROUPINFO_SUBMIT,GET_GROUPINFO_SUCCESS} from '../constants/userTypes';
import {GET_SELFINFO_SUBMIT,GET_SELFINFO_SUCCESS} from '../constants/userTypes';
import {RM_FRIEND_SUCCESS, RM_GROUP_SUCCESS} from '../constants/userTypes';
import {RM_GROUP_SUBMIT} from '../constants/userTypes';

const userInitialState = Immutable.Map({
    im: undefined,
    userId: undefined
});
const user = (state = userInitialState, action)=> {
    switch (action.type) {
        case LOGIN_SUCCESS:
            return state.set('im', action.im)
                .set('userId', action.userId);
        default:
            return state;

    }
};

const friendInfoInitialState = Immutable.Map({
    data: undefined
});
const friendInfo = (state = friendInfoInitialState, action)=> {
    switch (action.type) {
        case GET_FRIENDINFO_SUCCESS:
            return state.set('data', action.data);
        case RM_FRIEND_SUCCESS:
            return state.set('data', undefined);

        default:
            return state;
    }
};

const frinedInitialState = Immutable.Map({
    addFriendSubmit: false,
    addFriendSuccess: false,
    addFriendFail: false
});
const friend = (state = frinedInitialState, action)=> {
    switch (action.type) {
        case ADD_FRIEND_SUBMIT:
            return state.set('addFriendSubmit', true)
                .set('addFriendSuccess', false)
                .set('addFriendFail', false);
        case ADD_FRIEND_SUCCESS:
            return state.set('addFriendSubmit', false)
                .set('addFriendSuccess', true)
                .set('addFriendFail', false);
        case ADD_FRIEND_FAIL:
            return state.set('addFriendSubmit', false)
                .set('addFriendSuccess', false)
                .set('addFriendFail', true);
        default:
            return state;
    }
};

const frinedsInitialState = Immutable.Map({
    getFriendsSubmit: false,
    getFriendsSuccess: false,
    getFriendsFail: false,
    friends: []
});
const friends = (state = frinedsInitialState, action)=> {
    switch (action.type) {
        case LIST_FRIENDS_SUBMIT:
            return state.set('getFriendsSubmit', true)
                .set('getFriendsSuccess', false)
                .set('getFriendsFail', false);
        case LIST_FRIENDS_SUCCESS:
            return state.set('getFriendsSubmit', false)
                .set('getFriendsSuccess', true)
                .set('getFriendsFail', false)
                .set('friends', action.data);
        case LIST_FRIENDS_FAIL:
            return state.set('getFriendsSubmit', false)
                .set('getFriendsSuccess', false)
                .set('getFriendsFail', true);
        default:
            return state;
    }
};

const groupsInitialState = Immutable.List();
const groups = (state = groupsInitialState, action)=> {
    switch (action.type) {
        case LIST_GROUPS_SUCCESS:
            return Immutable.List(action.data);
        default:
            return state;
    }
};

const groupInfoInitialState = Immutable.Map({
    data: undefined
});
const groupInfo = (state = groupInfoInitialState, action) => {
    switch (action.type) {
        case GET_GROUPINFO_SUCCESS:
            return state.set('data', action.data);
        case RM_GROUP_SUCCESS:
            return state.set('data', undefined);
        default:
            return state;
    }
};

const selfInfoInitialState = Immutable.Map({
    data: undefined
});
const selfInfo = (state = selfInfoInitialState, action) => {
    switch (action.type) {
        case GET_SELFINFO_SUCCESS:
            return state.set('data', action.data);
        default:
            return state;
    }
};

export {user, friendInfo, friend, friends, groups, groupInfo, selfInfo}