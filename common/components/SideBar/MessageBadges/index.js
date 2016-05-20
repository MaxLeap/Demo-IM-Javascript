import React, {Component} from 'react';
import {Badge} from 'antd';
if (process.env.BROWSER) {
    require('./styles.scss')
}

export default class MessageList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            messageGroup: {},
            activeMessageId: ''
        }
    }

    handleOpenMessage = (messageId, messageType)=> {
        this.state.activeMessageId = messageId;
        this.props.openMessage({
            messageId: messageId,
            messageType: messageType
        })
    }

    componentWillReceiveProps = (nextProps)=> {
        let messageGroup = {};
        //遍历 messages 的 id, 添加消息组 name 和 消息组 type
        Object.keys(nextProps.messages).map((messageId)=> {
            let isGroup = false;
            nextProps.groups.map((group)=> {
                if (group.id === messageId) {
                    isGroup = true;
                    nextProps.messages[messageId].name = group.attributes.name;
                    nextProps.messages[messageId].type = 'group';
                }
            });
            if(isGroup){

            }else{
                nextProps.messages[messageId].name = messageId;
                nextProps.messages[messageId].type = 'friend';
            }
            messageGroup[messageId] = nextProps.messages[messageId];
        });
        this.setState({
            messageGroup: messageGroup
        });

    }

    render() {
        return (
            <section className="sidebar-message-badges">
                {Object.keys(this.state.messageGroup).map((item, i)=>
                    <div key={i} className={'message-badge-item ' + (item===this.props.messageId ? 'active' : '')} onClick={this.handleOpenMessage.bind(this, item, this.props.messages[item].type)}>
                        <Badge dot={this.props.messages[item].unreadCount > 0 ? true : false}>
                            {this.state.messageGroup[item].name}
                        </Badge>
                    </div>
                )}
            </section>
        )
    }
}
