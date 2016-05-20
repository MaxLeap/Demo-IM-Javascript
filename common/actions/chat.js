import {RECEIVE_MESSAGE, SEND_MESSAGE, OPEN_MESSAGE} from '../constants/messageTypes';

function receiveMessage(data) {
    return {
        type: RECEIVE_MESSAGE,
        data
    }
}

function sendMessage(data) {
    return dispatch => {
        dispatch({
            type: SEND_MESSAGE,
            data
        });
        switch (data.to.type) {
            case 'friend':
            {
                let msg = data.im.toFriend(data.to.id);
                if (data.content.media === 0) {
                    msg.text(data.content.body).ok();
                }else{
                    msg.mediaUrl(data.content).send();
                }

                data.messageId = data.to.id;
                dispatch(openMessage(data));
                break;
            }
            case 'group':
            {
                let msg = data.im.toGroup(data.to.id);
                if (data.content.media == 0){
                    msg.text(data.content.body).ok();
                }else{
                    msg.mediaUrl(data.content).send();
                }
                data.messageId = data.to.id;
                dispatch(openMessage(data));
                break;
            }
        }
    }
}

function openMessage(data) {
    return {
        type: OPEN_MESSAGE,
        data
    }
}

export {
    receiveMessage,
    sendMessage,
    openMessage
}