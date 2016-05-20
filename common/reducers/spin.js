import Immutable from 'immutable';
import {SHOW, HIDE} from '../constants/spinTypes';

const initialState = Immutable.Map({
    visible: false,
    ts: ''//每次接收到新的消息都更新此时间戳
});

export default (state = initialState, action) => {
    switch (action.type) {
        case SHOW:
            return state.set('visible', true)
                .set('ts', (new Date()).getTime());
        case HIDE:
            return state.set('visible', false)
                .set('ts', (new Date()).getTime());
        default:
            return state;
    }
}