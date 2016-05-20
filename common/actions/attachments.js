import {UPLOAD_ATTACHMENT_SUBMIT, UPLOAD_ATTACHMENT_SUCCESS} from '../constants/attachmentsTypes';
import {sendMessage} from './chat';
import {alertSuccess, alertError} from './alertInfo';

function uploadAttachment(data){
    return dispatch => {
        dispatch({
            type: UPLOAD_ATTACHMENT_SUBMIT
        });
        data.im.attachment(data.data, (err, res)=>{
            if (err) {
                dispatch(alertError(err));
            } else {
                dispatch(alertSuccess('上传成功'));
                data.content = {
                    body: res[0],
                    media: 1 //图片类型
                };
                data.ts = new Date().getTime();
                dispatch(sendMessage(data));
            }
        })
    }
}

export {
    uploadAttachment
}