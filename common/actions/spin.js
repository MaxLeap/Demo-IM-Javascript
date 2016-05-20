import {SHOW, HIDE} from '../constants/spinTypes';

export function showSpin(){
    return{
        type: SHOW
    }
}

export function hideSpin(){
    return {
        type: HIDE
    }
}