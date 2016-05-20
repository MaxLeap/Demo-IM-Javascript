import React, { Component } from 'react';
import {message} from 'antd';

export default class AlertInfo extends Component {
    constructor(props) {
        super(props);
    }

    componentWillReceiveProps=(nextProps)=>{
        //如果两次消息的时间戳相等,则不再重复提醒该消息
        if(this.props.alertInfo.ts === nextProps.alertInfo.ts){
            return;
        }
        message[nextProps.alertInfo.type](nextProps.alertInfo.message);
    }

    render(){
        return (
            <section />
        )
    }
}