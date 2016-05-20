import {ERROR, SUCCESS} from '../constants/alertInfoTypes';

export function alertError(error){
    return{
        type: ERROR,
        error
    }
}

export function alertSuccess(message){
    return {
        type: SUCCESS,
        message
    }
}