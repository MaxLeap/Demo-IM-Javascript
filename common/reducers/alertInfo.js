import Immutable from 'immutable';
import {ERROR, SUCCESS} from '../constants/alertInfoTypes';

const initialState = Immutable.Map({
    type: '',//error, success
    message: '',
    ts: ''//每次接收到新的消息都更新此时间戳
});

export default (state = initialState, action) => {
    switch (action.type) {
        case SUCCESS:
            return state.set('type', 'success')
                .set('message', action.message)
                .set('ts', (new Date()).getTime());
        case ERROR:
            return state.set('type', 'error')
                .set('message', JSON.parse(action.error).errorMessage)
                .set('ts', (new Date()).getTime());
        default:
            return state;
    }
}