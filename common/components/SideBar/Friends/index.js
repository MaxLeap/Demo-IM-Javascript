import React, {Component} from 'react';
import { Badge} from 'antd';
if(process.env.BROWSER){
    require('./styles.scss')
}

export default class Friends extends Component {
    constructor(props) {
        super(props);
    }
    handleOpenFriendInfo=(id)=>{
        this.props.openFriendInfo({
            im: this.props.im,
            id: id
        });
    }
    handleOpenMessage=(messageId)=>{
        this.props.openMessage({
            messageId: messageId
        })
    }
    render() {
        const {friends} = this.props;
        return (
            <section className="sidebar-friend-list">
                {friends.map((friend, i)=>
                    <div key={i} className={'friend-item ' + (friend.online ? 'online' : 'offline')} onClick={this.handleOpenFriendInfo.bind(this, friend.id)}>
                        <Badge>
                            <div className="friend-name">{friend.id}</div>
                        </Badge>
                    </div>
                )}
            </section>
        )
    }
}
