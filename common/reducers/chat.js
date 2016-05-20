import Immutable from 'immutable';
import {RECEIVE_MESSAGE, SEND_MESSAGE, OPEN_MESSAGE} from '../constants/messageTypes';

const initialState = Immutable.OrderedMap();

export default (state = initialState, action) => {
    switch (action.type) {
        case RECEIVE_MESSAGE:
        {
            let userId = action.data.userId;
            let data = {
                fromId: action.data.from.id,
                toId: action.data.to.id,
                ts: action.data.ts,
                content: action.data.content
            };
            //好友消息
            if(action.data.to.type === 0){
                let id;
                if (data.fromId === userId) {
                    id = data.toId;
                } else if (data.toId === userId) {
                    id = data.fromId;
                }
                if (state.get(id)) {
                    return state.updateIn([id, 'messageList'], (messageList=Immutable.List())=> {
                        return messageList.push(data);
                    }).updateIn([id, 'unreadCount'], (unreadCount)=>{
                        return ++unreadCount ;
                    })
                } else {
                    let messageData = Immutable.Map({
                        unreadCount: 1,
                        messageList: Immutable.List.of(data)
                    });
                    return state.set(id, messageData);
                }
            }else if(action.data.to.type === 1){
                let id = action.data.from.gid;
                if (state.get(id)) {
                    return state.updateIn([id, 'messageList'], (messageList=Immutable.List())=> {
                        return messageList.push(data);
                    }).updateIn([id, 'unreadCount'], (unreadCount)=>{
                        return ++unreadCount ;
                    })
                } else {
                    let messageData = Immutable.Map({
                        unreadCount: 1,
                        messageList: Immutable.List.of(data)
                    });
                    return state.set(id, messageData);
                }
            }
        }

        case SEND_MESSAGE:
        {
            let userId = action.data.userId;
            let data = {
                fromId: action.data.from.id,
                toId: action.data.to.id,
                ts: action.data.ts,
                content: action.data.content
            };

            let id;
            if (data.fromId === userId) {
                id = data.toId;
            } else if (data.toId === userId) {
                id = data.fromId;
            }
            if (state.get(id)) {
                return state.updateIn([id, 'messageList'], (messageList=Immutable.List())=> {
                    return messageList.push(data);
                }).updateIn([id, 'unreadCount'], (unreadCount)=>{
                    return ++unreadCount ;
                })
            } else {
                let messageData = Immutable.Map({
                    unreadCount: 1,
                    messageList: Immutable.List.of(data)
                });
                return state.set(id, messageData);
            }
        }

        case OPEN_MESSAGE:
            return state.updateIn([action.data.messageId, 'unreadCount'], (unreadCount)=> {
                return 0;
            }).updateIn([action.data.messageId, 'messageList'], (messageList=Immutable.List())=> {
                return messageList;
            }).updateIn([action.data.messageId, 'readts'], ()=> {//readts是打开消息的时间,每次打开消息都会更新,以触发react的重新渲染
                return (new Date()).getTime();
            });
        default:
            return state;
    }
}