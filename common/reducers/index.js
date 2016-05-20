import { combineReducers } from 'redux';
import auth from './auth';
import {user, friendInfo, friend, friends, groups, groupInfo, selfInfo} from './user';
import chat from './chat';
import alertInfo from './alertInfo';
import spin from './spin';

const rootReducer = combineReducers({
    auth,
    user,
    friendInfo,
    friend,
    friends,
    groups,
    groupInfo,
    selfInfo,
    chat,
    alertInfo,
    spin
});

export default rootReducer;